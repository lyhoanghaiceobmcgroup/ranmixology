import React from 'react';
import WebhookManager from '../components/WebhookManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Database, Webhook, MessageSquare } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">

      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8" />
            Admin Panel
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Quản lý hệ thống RAN Mixology - Webhook, Database và Real-time Communication
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <Webhook className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <CardTitle className="text-white">Telegram Webhook</CardTitle>
              <CardDescription className="text-gray-300">
                Nhận callback từ Telegram bot
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-sm text-gray-400">
                Xử lý approve/reject thanh toán
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <Database className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <CardTitle className="text-white">Supabase Database</CardTitle>
              <CardDescription className="text-gray-300">
                Lưu trữ đơn hàng và thông báo
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-sm text-gray-400">
                payment_orders & payment_notifications
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <CardTitle className="text-white">Real-time Updates</CardTitle>
              <CardDescription className="text-gray-300">
                Thông báo tức thì cho frontend
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-sm text-gray-400">
                Supabase Realtime subscriptions
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Webhook Manager */}
        <div className="mb-8">
          <WebhookManager />
        </div>

        {/* System Flow */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Luồng xử lý thanh toán</CardTitle>
            <CardDescription className="text-gray-300">
              Quy trình từ Telegram đến Frontend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <div className="font-medium text-white">Khách hàng gửi bill thanh toán</div>
                  <div className="text-sm text-gray-400">Frontend → telegramService.sendPaymentVerification()</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <div className="font-medium text-white">Tạo đơn hàng trong database</div>
                  <div className="text-sm text-gray-400">Supabase → payment_orders table</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <div className="font-medium text-white">Gửi message với inline keyboard</div>
                  <div className="text-sm text-gray-400">Telegram Bot API → Admin nhận thông báo</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <div className="font-medium text-white">Admin bấm Approve/Reject</div>
                  <div className="text-sm text-gray-400">Telegram → Webhook → Supabase Edge Function</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  5
                </div>
                <div>
                  <div className="font-medium text-white">Cập nhật trạng thái đơn hàng</div>
                  <div className="text-sm text-gray-400">Database → payment_orders & payment_notifications</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  6
                </div>
                <div>
                  <div className="font-medium text-white">Frontend nhận real-time update</div>
                  <div className="text-sm text-gray-400">Supabase Realtime → MusicPaymentModal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;