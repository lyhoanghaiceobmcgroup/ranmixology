import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TelegramUpdate {
  update_id: number;
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    message?: {
      message_id: number;
      chat: {
        id: number;
      };
    };
    data: string;
  };
}

interface PaymentOrder {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN') || '8168944752:AAErA0I9XFXiNdfuA3xsz0RQc8Foa0oKib4';
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const update: TelegramUpdate = await req.json();
    console.log('Received Telegram update:', JSON.stringify(update, null, 2));
    
    // Xử lý callback query từ inline keyboard
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const callbackData = callbackQuery.data;
      
      console.log('Processing callback query:', callbackData);
      
      // Parse callback data: approve_timestamp_customerName hoặc reject_timestamp_customerName
      const [action, timestamp, customerName] = callbackData.split('_');
      
      if (action === 'approve' || action === 'reject') {
        const status = action === 'approve' ? 'approved' : 'rejected';
        
        // Cập nhật trạng thái đơn hàng trong database
        const { data: order, error: updateError } = await supabase
          .from('payment_orders')
          .update({ 
            status: status,
            updated_at: new Date().toISOString()
          })
          .eq('customer_name', customerName)
          .eq('status', 'pending')
          .select()
          .single();
          
        if (updateError) {
          console.error('Error updating order:', updateError);
          // Tạo đơn hàng mới nếu không tìm thấy
          const { data: newOrder, error: insertError } = await supabase
            .from('payment_orders')
            .insert({
              id: `order_${timestamp}_${customerName}`,
              customer_name: customerName,
              email: 'customer@example.com',
              phone: '0123456789',
              amount: 50000,
              status: status,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();
            
          if (insertError) {
            console.error('Error creating order:', insertError);
          } else {
            console.log('Created new order:', newOrder);
          }
        } else {
          console.log('Updated order:', order);
        }
        
        // Gửi phản hồi cho Telegram bot
        const responseText = status === 'approved' 
          ? `✅ Đã xác nhận thanh toán cho ${customerName}`
          : `❌ Đã từ chối thanh toán cho ${customerName}`;
          
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: responseText,
            show_alert: true
          })
        });
        
        // Gửi real-time update thông qua Supabase Realtime
        const { error: realtimeError } = await supabase
          .from('payment_notifications')
          .insert({
            order_id: `order_${timestamp}_${customerName}`,
            customer_name: customerName,
            status: status,
            message: status === 'approved' 
              ? 'Thanh toán đã được xác nhận! Bạn có thể bắt đầu tạo nhạc AI.'
              : 'Thanh toán bị từ chối. Vui lòng kiểm tra lại thông tin.',
            created_at: new Date().toISOString()
          });
          
        if (realtimeError) {
          console.error('Error sending realtime notification:', realtimeError);
        } else {
          console.log('Sent realtime notification for:', customerName);
        }
      }
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});