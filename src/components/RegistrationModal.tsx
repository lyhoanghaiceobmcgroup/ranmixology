import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { telegramService, type RegistrationData } from "@/services/telegramService";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventType: string;
  eventTitle?: string;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  age: string;
  branch: string;
  preferredTime: string;
  specialRequests: string;
}

const RegistrationModal = ({ isOpen, onClose, eventType, eventTitle }: RegistrationModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    branch: "",
    preferredTime: "",
    specialRequests: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const registrationData: RegistrationData = {
        ...formData,
        eventType,
        eventTitle
      };

      const success = await telegramService.sendRegistration(registrationData);

      if (success) {
        alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        onClose();
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          age: "",
          branch: "",
          preferredTime: "",
          specialRequests: ""
        });
      } else {
        throw new Error('Failed to send registration');
      }
    } catch (error) {
      console.error('Error sending registration:', error);
      alert('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.phone && formData.email && formData.branch;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] bg-background border-primary/20 overflow-hidden">
        <DialogHeader className="pb-4 border-b border-primary/10">
          <DialogTitle className="font-playfair text-xl sm:text-2xl text-center text-primary">
            Đăng ký {eventType}
          </DialogTitle>
          {eventTitle && (
            <p className="text-center text-muted-foreground text-sm mt-1">{eventTitle}</p>
          )}
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Cột trái */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nhập họ và tên"
                  className="mt-1 h-10"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="mt-1 h-10"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Nhập địa chỉ email"
                  className="mt-1 h-10"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-sm font-medium text-foreground">Tuổi</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Nhập tuổi"
                  className="mt-1 h-10"
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="branch" className="text-sm font-medium text-foreground">
                  Chi nhánh <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                  <SelectTrigger className="mt-1 h-10">
                    <SelectValue placeholder="Chọn chi nhánh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="40 Ngô Quyền, Hà Nội">40 Ngô Quyền, Hà Nội</SelectItem>
                    <SelectItem value="35 Nguyễn Bỉnh Khiêm, Hà Nội">35 Nguyễn Bỉnh Khiêm, Hà Nội</SelectItem>
                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">
                  Thời gian ưa thích
                </Label>
                <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                  <SelectTrigger className="mt-1 h-10">
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sáng (9:00 - 12:00)">Sáng (9:00 - 12:00)</SelectItem>
                    <SelectItem value="Chiều (14:00 - 17:00)">Chiều (14:00 - 17:00)</SelectItem>
                    <SelectItem value="Tối (19:00 - 22:00)">Tối (19:00 - 22:00)</SelectItem>
                    <SelectItem value="Cuối tuần">Cuối tuần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="specialRequests" className="text-sm font-medium text-foreground">
                  Yêu cầu đặc biệt
                </Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                  className="mt-1 min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary/10">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-primary/20 hover:bg-primary/5 h-11"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90 h-11"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;