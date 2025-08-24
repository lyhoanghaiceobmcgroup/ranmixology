// Telegram Bot Service for payment verification and registration
export interface PaymentInfo {
  customerName: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  timestamp: string;
}

export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  age: string;
  branch: string;
  preferredTime: string;
  specialRequests: string;
  eventType: string;
  eventTitle?: string;
}

export interface QuickBookingData {
  type: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
  timestamp: string;
}

export interface TelegramMessage {
  chat_id: string;
  text: string;
  reply_markup?: {
    inline_keyboard: Array<Array<{
      text: string;
      callback_data: string;
    }>>;
  };
}

class TelegramService {
  private botToken: string;
  private chatId: string;
  private baseUrl: string;

  constructor() {
    // Thay thế bằng bot token và chat ID thực tế
    this.botToken = '8168944752:AAErA0I9XFXiNdfuA3xsz0RQc8Foa0oKib4';
    this.chatId = '-4936541799'; // Updated chat ID for payment notifications
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendPaymentVerification(paymentInfo: PaymentInfo, billImage?: File): Promise<{success: boolean, orderId?: string}> {
    try {
      const timestamp = Date.now();
      const orderId = `order_${timestamp}_${paymentInfo.customerName}`;
      
      // Tạo đơn hàng trong database
      const { data: supabase } = await import('../integrations/supabase/client');
      const { error: insertError } = await supabase
        .from('payment_orders')
        .insert({
          id: orderId,
          customer_name: paymentInfo.customerName,
          email: paymentInfo.email,
          phone: paymentInfo.phone,
          amount: paymentInfo.amount,
          status: 'pending'
        });
        
      if (insertError) {
        console.error('Error creating payment order:', insertError);
        return { success: false };
      }
      
      const message: TelegramMessage = {
        chat_id: this.chatId,
        text: `🎵 RAN MIXOLOGY - Yêu cầu xác thực thanh toán

👤 Tài khoản: ${paymentInfo.customerName}
💰 Số tiền: ${paymentInfo.amount.toLocaleString('vi-VN')} VND
📱 Số điện thoại: ${paymentInfo.phone}
📧 Email: ${paymentInfo.email}
🆔 Mã đơn: ${orderId}
⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}

Vui lòng xác thực thanh toán này để khách hàng có thể tạo nhạc AI.`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Xác nhận thanh toán",
                callback_data: `approve_${timestamp}_${paymentInfo.customerName}`
              },
              {
                text: "❌ Từ chối thanh toán", 
                callback_data: `reject_${timestamp}_${paymentInfo.customerName}`
              }
            ]
          ]
        }
      };

      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();
      return { success: result.ok, orderId: result.ok ? orderId : undefined };
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return { success: false };
    }
  }

  // Simulate approval for demo purposes
  // In production, this would be handled by webhook from Telegram
  async simulateApproval(delay: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random approval (80% chance)
        const approved = Math.random() > 0.2;
        resolve(approved);
      }, delay);
    });
  }

  // Kiểm tra trạng thái đơn hàng thông qua database
  async checkPaymentStatus(orderId: string): Promise<'pending' | 'approved' | 'rejected'> {
    try {
      const { data: supabase } = await import('../integrations/supabase/client');
      const { data: order, error } = await supabase
        .from('payment_orders')
        .select('status')
        .eq('id', orderId)
        .single();
        
      if (error) {
        console.error('Error checking payment status:', error);
        return 'pending';
      }
      
      return order?.status || 'pending';
    } catch (error) {
      console.error('Error checking payment status:', error);
      return 'pending';
    }
  }
  
  // Lắng nghe real-time updates cho đơn hàng
  subscribeToPaymentUpdates(customerName: string, callback: (status: 'approved' | 'rejected', message: string) => void): () => void {
    const { data: supabase } = require('../integrations/supabase/client');
    
    const subscription = supabase
      .channel('payment_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'payment_notifications',
          filter: `customer_name=eq.${customerName}`
        },
        (payload: any) => {
          console.log('Received payment notification:', payload);
          const { status, message } = payload.new;
          callback(status, message);
        }
      )
      .subscribe();
      
    // Return unsubscribe function
    return () => {
      supabase.removeChannel(subscription);
    };
  }

  // Setup webhook (for production use)
  async setupWebhook(webhookUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
        }),
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Error setting up webhook:', error);
      return false;
    }
  }

  async sendRegistration(data: RegistrationData): Promise<boolean> {
    try {
      const message = this.formatRegistrationMessage(data);
      
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API Error:', errorData);
        return false;
      }

      const result = await response.json();
      console.log('Registration message sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending registration to Telegram:', error);
      return false;
    }
  }

  async sendQuickBooking(data: QuickBookingData): Promise<boolean> {
    try {
      const message: TelegramMessage = {
        chat_id: this.chatId,
        text: this.formatQuickBookingMessage(data),
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Xác nhận đặt bàn", callback_data: `confirm_booking_${Date.now()}` },
              { text: "📞 Gọi khách hàng", callback_data: `call_customer_${Date.now()}` }
            ]
          ]
        }
      };

      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API Error:', errorData);
        return false;
      }

      const result = await response.json();
      console.log('Quick booking message sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending quick booking to Telegram:', error);
      return false;
    }
  }

  private formatQuickBookingMessage(data: QuickBookingData): string {
    // Check if this is a quick info form (has name, phone, email) or booking form (has branch, date, time)
    if ('name' in data && 'phone' in data && 'email' in data) {
      // Quick info form format
      return `🍽️ *ĐẶT BÀN NHANH - FORM THÔNG TIN*\n\n` +
        `👤 *THÔNG TIN KHÁCH HÀNG*\n` +
        `• *Họ tên:* ${data.name}\n` +
        `• *Số điện thoại:* ${data.phone}\n` +
        `• *Email:* ${data.email}\n` +
        `• *Thời gian ưa thích:* ${data.preferredTime}\n\n` +
        `⏰ *Thời gian đặt:* ${data.timestamp}\n` +
        `🏪 *Nguồn:* RAN Mixology Website\n\n` +
        `⚡ *Yêu cầu liên hệ xác nhận đặt bàn*`;
    } else {
      // Original booking form format
      return `🍽️ *ĐẶT BÀN NHANH MỚI*\n\n` +
        `📍 *Chi nhánh:* ${data.branch}\n` +
        `📅 *Ngày:* ${data.date}\n` +
        `🕐 *Giờ:* ${data.time}\n` +
        `👥 *Số khách:* ${data.guests}\n` +
        `📝 *Ghi chú:* ${data.notes}\n\n` +
        `⏰ *Thời gian đặt:* ${data.timestamp}\n` +
        `🏪 *Nguồn:* RAN Mixology Website\n\n` +
        `⚡ *Yêu cầu xử lý nhanh - Đặt bàn trực tiếp từ website*`;
    }
  }

  private formatRegistrationMessage(data: RegistrationData): string {
    const timestamp = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return `🎉 *ĐĂNG KÝ SỰ KIỆN MỚI*\n\n` +
      `📋 *Loại sự kiện:* ${data.eventType}\n` +
      `🎯 *Tên sự kiện:* ${data.eventTitle || 'Không xác định'}\n\n` +
      `👤 *THÔNG TIN KHÁCH HÀNG*\n` +
      `• *Họ tên:* ${data.fullName}\n` +
      `• *Số điện thoại:* ${data.phone}\n` +
      `• *Email:* ${data.email}\n` +
      `• *Tuổi:* ${data.age || 'Không cung cấp'}\n` +
      `• *Chi nhánh:* ${data.branch}\n` +
      `• *Thời gian mong muốn:* ${data.preferredTime || 'Linh hoạt'}\n` +
      `• *Yêu cầu đặc biệt:* ${data.specialRequests || 'Không có'}\n\n` +
      `⏰ *Thời gian đăng ký:* ${timestamp}\n` +
      `🏪 *Nguồn:* RAN Mixology Website`;
  }
}

export const telegramService = new TelegramService();