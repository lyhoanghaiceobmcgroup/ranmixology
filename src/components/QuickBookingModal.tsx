import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { telegramService } from '@/services/telegramService';
import { toast } from 'sonner';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickBookingFormData {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
}

const QuickBookingModal: React.FC<QuickBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuickBookingFormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof QuickBookingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.preferredTime) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingInfo = {
        type: "Đặt bàn nhanh - Form thông tin",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredTime: formData.preferredTime,
        timestamp: new Date().toLocaleString('vi-VN')
      };

      await telegramService.sendQuickBooking(bookingInfo);
      
      toast.success("Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.");
      
      // Reset form and close modal
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredTime: ''
      });
      onClose();
    } catch (error) {
      console.error("Error sending booking:", error);
      toast.error("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      preferredTime: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-md border-primary/20">
        <DialogHeader className="space-y-3 pb-4 border-b border-primary/10">
          <DialogTitle className="text-xl font-playfair text-center text-foreground">
            Đặt bàn nhanh
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Điền thông tin để chúng tôi liên hệ xác nhận đặt bàn
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center">
              <User className="w-4 h-4 mr-2 text-primary" />
              Họ và tên <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/40"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              Số điện thoại <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/40"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              Email <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/40"
              required
            />
          </div>

          {/* Preferred Time Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Thời gian ưa thích <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
              <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40">
                <SelectValue placeholder="Chọn thời gian ưa thích" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="17:00-18:00">17:00 - 18:00</SelectItem>
                <SelectItem value="18:00-19:00">18:00 - 19:00</SelectItem>
                <SelectItem value="19:00-20:00">19:00 - 20:00</SelectItem>
                <SelectItem value="20:00-21:00">20:00 - 21:00</SelectItem>
                <SelectItem value="21:00-22:00">21:00 - 22:00</SelectItem>
                <SelectItem value="22:00-23:00">22:00 - 23:00</SelectItem>
                <SelectItem value="flexible">Linh hoạt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-primary/10">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1 border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-accent text-primary-foreground hover:shadow-glow"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Đang đặt bàn...' : 'Đặt bàn'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickBookingModal;