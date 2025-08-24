import { telegramService } from './telegramService';

class WebhookService {
  private webhookUrl: string;
  
  constructor() {
    // URL của Supabase Edge Function để nhận webhook
    this.webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-webhook`;
  }
  
  // Thiết lập webhook cho Telegram bot
  async setupTelegramWebhook(): Promise<boolean> {
    try {
      const success = await telegramService.setupWebhook(this.webhookUrl);
      
      if (success) {
        console.log('Telegram webhook setup successfully:', this.webhookUrl);
        return true;
      } else {
        console.error('Failed to setup Telegram webhook');
        return false;
      }
    } catch (error) {
      console.error('Error setting up webhook:', error);
      return false;
    }
  }
  
  // Kiểm tra trạng thái webhook
  async getWebhookInfo(): Promise<any> {
    try {
      const botToken = '8168944752:AAErA0I9XFXiNdfuA3xsz0RQc8Foa0oKib4';
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
      const result = await response.json();
      
      console.log('Webhook info:', result);
      return result;
    } catch (error) {
      console.error('Error getting webhook info:', error);
      return null;
    }
  }
  
  // Xóa webhook (để test local)
  async deleteWebhook(): Promise<boolean> {
    try {
      const botToken = '8168944752:AAErA0I9XFXiNdfuA3xsz0RQc8Foa0oKib4';
      const response = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
        method: 'POST'
      });
      const result = await response.json();
      
      console.log('Webhook deleted:', result);
      return result.ok;
    } catch (error) {
      console.error('Error deleting webhook:', error);
      return false;
    }
  }
}

export const webhookService = new WebhookService();
export default webhookService;