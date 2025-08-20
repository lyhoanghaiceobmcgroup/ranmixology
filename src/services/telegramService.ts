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
    this.chatId = '-4873169705'; // Updated chat ID for registration
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendPaymentVerification(paymentInfo: PaymentInfo, billImage?: File): Promise<boolean> {
    try {
      const message: TelegramMessage = {
        chat_id: this.chatId,
        text: `🎵 RAN MIXOLOGY - Yêu cầu xác thực thanh toán

👤 Tài khoản: ${paymentInfo.customerName}
💰 Số tiền: ${paymentInfo.amount.toLocaleString('vi-VN')} VND
📱 Số điện thoại: ${paymentInfo.phone}
⏰ Thời gian cập nhật: ${new Date().toLocaleString('vi-VN')}

Vui lòng xác thực thanh toán này để khách hàng có thể tạo nhạc AI.`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Xác nhận thanh toán",
                callback_data: `approve_${Date.now()}_${paymentInfo.customerName}`
              },
              {
                text: "❌ Từ chối thanh toán", 
                callback_data: `reject_${Date.now()}_${paymentInfo.customerName}`
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
      return result.ok;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
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

  // Method to check payment status (would be implemented with webhook in production)
  async checkPaymentStatus(customerName: string): Promise<'pending' | 'approved' | 'rejected'> {
    try {
      // Kiểm tra trạng thái thanh toán thông qua webhook hoặc polling
      // Trong thực tế, bạn có thể lưu trạng thái vào database và check từ đó
      const response = await fetch(`${this.baseUrl}/getUpdates`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        // Tìm callback data phù hợp với customerName
        const updates = data.result || [];
        
        for (const update of updates.reverse()) {
          if (update.callback_query && update.callback_query.data) {
            const callbackData = update.callback_query.data;
            if (callbackData.includes(customerName)) {
              if (callbackData.startsWith('approve_')) {
                return 'approved';
              } else if (callbackData.startsWith('reject_')) {
                return 'rejected';
              }
            }
          }
        }
      }
      
      return 'pending';
    } catch (error) {
      console.error('Error checking payment status:', error);
      return 'pending';
    }
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