import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  CreditCard,
  User,
  Phone,
  Mail
} from "lucide-react";
import { cartService, CartItem, CartState } from "@/services/cartService";
import { telegramService, PaymentInfo } from "@/services/telegramService";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'cart' | 'info' | 'payment';

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [cart, setCart] = useState<CartState>(cartService.getCart());
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });
  const { toast } = useToast();

  const branches = [
    { id: 'hanoi', name: 'Hà Nội - Ngô Quyền', address: '123 Ngô Quyền, Hoàn Kiếm, Hà Nội' },
    { id: 'hcm', name: 'TP.HCM - Quận 1', address: '456 Nguyễn Huệ, Quận 1, TP.HCM' },
    { id: 'danang', name: 'Đà Nẵng - Hải Châu', address: '789 Trần Phú, Hải Châu, Đà Nẵng' }
  ];

  useEffect(() => {
    const unsubscribe = cartService.subscribe((updatedCart) => {
      setCart(updatedCart);
    });

    return unsubscribe;
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    cartService.updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    cartService.removeItem(itemId);
  };

  const handleBranchSelect = (branchId: string) => {
    cartService.setSelectedBranch(branchId);
  };

  const handleNextStep = () => {
    if (currentStep === 'cart') {
      if (cart.items.length === 0) {
        toast({
          title: "Giỏ hàng trống",
          description: "Vui lòng thêm sản phẩm vào giỏ hàng",
          variant: "destructive"
        });
        return;
      }
      if (!cart.selectedBranch) {
        toast({
          title: "Chưa chọn chi nhánh",
          description: "Vui lòng chọn chi nhánh để tiếp tục",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('info');
    } else if (currentStep === 'info') {
      if (!customerInfo.fullName || !customerInfo.phone) {
        toast({
          title: "Thiếu thông tin",
          description: "Vui lòng điền đầy đủ họ tên và số điện thoại",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('payment');
    }
  };

  const handleSubmitOrder = async () => {
    const orderData = {
      customerInfo,
      cart,
      branch: branches.find(b => b.id === cart.selectedBranch),
      timestamp: new Date().toLocaleString('vi-VN')
    };

    // Format order message for Telegram
    const orderMessage = `🛒 **ĐỚN HÀNG MỚI - RAN MIXOLOGY**\n\n` +
      `👤 **Khách hàng:** ${customerInfo.fullName}\n` +
      `📱 **Số điện thoại:** ${customerInfo.phone}\n` +
      `📧 **Email:** ${customerInfo.email || 'Không có'}\n` +
      `🏪 **Chi nhánh:** ${orderData.branch?.name}\n` +
      `📍 **Địa chỉ:** ${orderData.branch?.address}\n\n` +
      `**CHI TIẾT ĐƠN HÀNG:**\n` +
      cart.items.map(item => 
        `• ${item.name} x${item.quantity} - ${cartService.formatPrice(item.priceNumber * item.quantity)}`
      ).join('\n') +
      `\n\n💰 **Tổng tiền:** ${cartService.formatPrice(cart.totalPrice)}\n` +
      `⏰ **Thời gian:** ${orderData.timestamp}\n` +
      (customerInfo.notes ? `📝 **Ghi chú:** ${customerInfo.notes}\n` : '') +
      `\n✅ Vui lòng xác nhận đơn hàng này!`;

    try {
      // Send order to Telegram (reuse existing telegramService)
      const paymentInfo: PaymentInfo = {
        customerName: customerInfo.fullName,
        email: customerInfo.email || 'customer@example.com',
        phone: customerInfo.phone,
        amount: cart.totalPrice,
        paymentMethod: 'Thanh toán tại quầy',
        timestamp: orderData.timestamp
      };

      const result = await telegramService.sendPaymentVerification(paymentInfo);
      
      if (result.success) {
        toast({
          title: "Đặt hàng thành công!",
          description: "Đơn hàng đã được gửi đến cửa hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất."
        });
        
        // Clear cart and close modal
        cartService.clearCart();
        setCurrentStep('cart');
        setCustomerInfo({ fullName: '', phone: '', email: '', notes: '' });
        onClose();
      } else {
        throw new Error('Failed to send order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Lỗi đặt hàng",
        description: "Không thể gửi đơn hàng. Vui lòng thử lại.",
        variant: "destructive"
      });
    }
  };

  const renderCartStep = () => (
    <div className="space-y-4">
      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Giỏ hàng trống</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.mood.map(mood => (
                        <Badge key={mood} variant="secondary" className="text-xs">{mood}</Badge>
                      ))}
                    </div>
                    <p className="font-semibold text-primary">{cartService.formatPrice(item.priceNumber)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Tổng cộng:</span>
              <span className="font-bold text-lg text-primary">
                {cartService.formatPrice(cart.totalPrice)}
              </span>
            </div>
            
            <div className="space-y-3">
              <Label>Chọn chi nhánh:</Label>
              <Select value={cart.selectedBranch} onValueChange={handleBranchSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.id}>
                      <div>
                        <div className="font-semibold">{branch.name}</div>
                        <div className="text-xs text-muted-foreground">{branch.address}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderInfoStep = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="fullName">Họ và tên *</Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Nhập họ và tên"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Nhập số điện thoại"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Nhập email (tùy chọn)"
          />
        </div>
        
        <div>
          <Label htmlFor="notes">Ghi chú</Label>
          <Input
            id="notes"
            value={customerInfo.notes}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Ghi chú đặc biệt (tùy chọn)"
          />
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="font-bold text-lg text-primary">
            {cartService.formatPrice(cart.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <CreditCard className="w-16 h-16 mx-auto text-primary mb-4" />
        <h3 className="font-semibold text-lg mb-2">Xác nhận đơn hàng</h3>
        <p className="text-muted-foreground text-sm">
          Đơn hàng sẽ được gửi đến cửa hàng và chúng tôi sẽ liên hệ với bạn để xác nhận.
        </p>
      </div>
      
      <Card className="p-4">
        <h4 className="font-semibold mb-2">Thông tin đơn hàng:</h4>
        <div className="space-y-1 text-sm">
          <div><strong>Khách hàng:</strong> {customerInfo.fullName}</div>
          <div><strong>Số điện thoại:</strong> {customerInfo.phone}</div>
          <div><strong>Chi nhánh:</strong> {branches.find(b => b.id === cart.selectedBranch)?.name}</div>
          <div><strong>Tổng tiền:</strong> {cartService.formatPrice(cart.totalPrice)}</div>
        </div>
      </Card>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 'cart': return 'Giỏ hàng';
      case 'info': return 'Thông tin khách hàng';
      case 'payment': return 'Xác nhận đặt hàng';
      default: return 'Giỏ hàng';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            {getStepTitle()}
            {cart.totalItems > 0 && (
              <Badge variant="secondary">{cart.totalItems} sản phẩm</Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {currentStep === 'cart' && renderCartStep()}
          {currentStep === 'info' && renderInfoStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          
          <div className="flex justify-between gap-3">
            {currentStep !== 'cart' && (
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === 'info') setCurrentStep('cart');
                  if (currentStep === 'payment') setCurrentStep('info');
                }}
              >
                Quay lại
              </Button>
            )}
            
            <div className="flex gap-3 ml-auto">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
              
              {currentStep === 'payment' ? (
                <Button onClick={handleSubmitOrder} className="bg-primary">
                  Xác nhận đặt hàng
                </Button>
              ) : (
                <Button onClick={handleNextStep} className="bg-primary">
                  {currentStep === 'cart' ? 'Tiếp tục' : 'Xác nhận'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;