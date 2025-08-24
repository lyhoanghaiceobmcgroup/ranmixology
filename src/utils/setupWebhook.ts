import { webhookService } from '../services/webhookService';

// Script để thiết lập webhook cho Telegram bot
export async function setupWebhookForTelegram() {
  console.log('🚀 Bắt đầu thiết lập webhook cho Telegram bot...');
  
  try {
    // 1. Kiểm tra thông tin webhook hiện tại
    console.log('📋 Kiểm tra webhook hiện tại...');
    const currentWebhook = await webhookService.getWebhookInfo();
    
    if (currentWebhook?.result?.url) {
      console.log('🔗 Webhook hiện tại:', currentWebhook.result.url);
      console.log('📊 Pending updates:', currentWebhook.result.pending_update_count);
    }
    
    // 2. Thiết lập webhook mới
    console.log('⚙️ Thiết lập webhook mới...');
    const success = await webhookService.setupTelegramWebhook();
    
    if (success) {
      console.log('✅ Webhook đã được thiết lập thành công!');
      
      // 3. Xác nhận webhook đã được thiết lập
      console.log('🔍 Xác nhận webhook...');
      const newWebhook = await webhookService.getWebhookInfo();
      
      if (newWebhook?.result?.url) {
        console.log('🎉 Webhook hoạt động:', newWebhook.result.url);
        console.log('📈 Last error date:', newWebhook.result.last_error_date || 'None');
        console.log('📝 Last error message:', newWebhook.result.last_error_message || 'None');
        
        return {
          success: true,
          webhookUrl: newWebhook.result.url,
          message: 'Webhook thiết lập thành công!'
        };
      }
    }
    
    throw new Error('Không thể thiết lập webhook');
    
  } catch (error) {
    console.error('❌ Lỗi thiết lập webhook:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Thiết lập webhook thất bại'
    };
  }
}

// Script để test hệ thống webhook
export async function testWebhookSystem() {
  console.log('🧪 Bắt đầu test hệ thống webhook...');
  
  try {
    // 1. Kiểm tra webhook info
    const webhookInfo = await webhookService.getWebhookInfo();
    
    if (!webhookInfo?.result?.url) {
      throw new Error('Webhook chưa được thiết lập');
    }
    
    console.log('✅ Webhook URL:', webhookInfo.result.url);
    console.log('📊 Pending updates:', webhookInfo.result.pending_update_count);
    
    // 2. Test database connection (thông qua Supabase client)
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
    
    // Test query to payment_orders table
    const { data, error } = await supabase
      .from('payment_orders')
      .select('*')
      .limit(1);
    
    if (error) {
      console.warn('⚠️ Database test warning:', error.message);
    } else {
      console.log('✅ Database connection OK');
    }
    
    // 3. Test real-time subscription
    console.log('🔄 Testing real-time subscription...');
    const channel = supabase
      .channel('test-payment-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'payment_notifications'
        },
        (payload) => {
          console.log('📨 Real-time event received:', payload);
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });
    
    // Cleanup after 5 seconds
    setTimeout(() => {
      supabase.removeChannel(channel);
      console.log('🧹 Test cleanup completed');
    }, 5000);
    
    return {
      success: true,
      message: 'Hệ thống webhook hoạt động bình thường',
      webhookUrl: webhookInfo.result.url,
      pendingUpdates: webhookInfo.result.pending_update_count
    };
    
  } catch (error) {
    console.error('❌ Test thất bại:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Test hệ thống thất bại'
    };
  }
}

// Utility function để reset webhook (cho development)
export async function resetWebhook() {
  console.log('🔄 Reset webhook...');
  
  try {
    // Delete current webhook
    await webhookService.deleteWebhook();
    console.log('🗑️ Webhook cũ đã được xóa');
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Setup new webhook
    const result = await setupWebhookForTelegram();
    
    return result;
  } catch (error) {
    console.error('❌ Reset webhook thất bại:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}