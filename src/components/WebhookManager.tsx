import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CheckCircle, XCircle, RefreshCw, Settings, TestTube } from 'lucide-react';
import { setupWebhookForTelegram, testWebhookSystem, resetWebhook } from '../utils/setupWebhook';
import { webhookService } from '../services/webhookService';

interface WebhookStatus {
  url?: string;
  isActive: boolean;
  pendingUpdates: number;
  lastError?: string;
  lastErrorDate?: number;
}

const WebhookManager: React.FC = () => {
  const [webhookStatus, setWebhookStatus] = useState<WebhookStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load webhook status on component mount
  useEffect(() => {
    loadWebhookStatus();
  }, []);

  const loadWebhookStatus = async () => {
    try {
      const info = await webhookService.getWebhookInfo();
      
      if (info?.result) {
        setWebhookStatus({
          url: info.result.url,
          isActive: !!info.result.url,
          pendingUpdates: info.result.pending_update_count || 0,
          lastError: info.result.last_error_message,
          lastErrorDate: info.result.last_error_date
        });
      }
    } catch (error) {
      console.error('Error loading webhook status:', error);
      setWebhookStatus({
        isActive: false,
        pendingUpdates: 0
      });
    }
  };

  const handleSetupWebhook = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const result = await setupWebhookForTelegram();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        await loadWebhookStatus();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Lỗi không xác định' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestSystem = async () => {
    setTesting(true);
    setMessage(null);
    
    try {
      const result = await testWebhookSystem();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Test thất bại' 
      });
    } finally {
      setTesting(false);
    }
  };

  const handleResetWebhook = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const result = await resetWebhook();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Webhook đã được reset thành công!' });
        await loadWebhookStatus();
      } else {
        setMessage({ type: 'error', text: 'Reset webhook thất bại' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Reset thất bại' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quản lý Telegram Webhook
        </CardTitle>
        <CardDescription>
          Thiết lập và quản lý webhook để nhận callback từ Telegram bot
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Webhook Status */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Trạng thái Webhook</h3>
          
          {webhookStatus ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {webhookStatus.isActive ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Hoạt động
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    Không hoạt động
                  </Badge>
                )}
                
                {webhookStatus.pendingUpdates > 0 && (
                  <Badge variant="outline">
                    {webhookStatus.pendingUpdates} pending updates
                  </Badge>
                )}
              </div>
              
              {webhookStatus.url && (
                <div className="text-xs text-muted-foreground break-all">
                  URL: {webhookStatus.url}
                </div>
              )}
              
              {webhookStatus.lastError && (
                <Alert>
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Lỗi cuối: {webhookStatus.lastError}
                    {webhookStatus.lastErrorDate && (
                      <div className="text-xs mt-1">
                        {new Date(webhookStatus.lastErrorDate * 1000).toLocaleString('vi-VN')}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Đang tải...</div>
          )}
        </div>

        {/* Message */}
        {message && (
          <Alert className={message.type === 'success' ? 'border-green-500' : 'border-red-500'}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleSetupWebhook} 
            disabled={loading || testing}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            Thiết lập Webhook
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleTestSystem} 
            disabled={loading || testing}
            className="flex items-center gap-2"
          >
            {testing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TestTube className="h-4 w-4" />
            )}
            Test Hệ thống
          </Button>
          
          <Button 
            variant="outline" 
            onClick={loadWebhookStatus} 
            disabled={loading || testing}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={handleResetWebhook} 
            disabled={loading || testing}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Reset Webhook
          </Button>
        </div>
        
        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Hướng dẫn:</strong></p>
          <p>1. Nhấn "Thiết lập Webhook" để cấu hình webhook cho Telegram bot</p>
          <p>2. Nhấn "Test Hệ thống" để kiểm tra kết nối database và real-time</p>
          <p>3. Nhấn "Reset Webhook" nếu cần thiết lập lại từ đầu</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookManager;