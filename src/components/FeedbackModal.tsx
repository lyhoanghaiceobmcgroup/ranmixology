import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, Send, Star, MessageCircle, ThumbsUp, Clock, CheckCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackFormData {
  fullName: string;
  phone: string;
  email: string;
  branch: string;
  rating: string;
  category: string;
  subject: string;
  message: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FeedbackFormData>({
    fullName: '',
    phone: '',
    email: '',
    branch: '',
    rating: '',
    category: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const branches = [
    { value: 'hanoi', label: 'RAN Mixology - Hà Nội' },
    { value: 'hcm', label: 'RAN Bitro - TP.HCM' },
    { value: 'danang', label: 'RAN Coffee Tea - Đà Nẵng' },
    { value: 'general', label: 'Góp ý chung' }
  ];

  const categories = [
    { value: 'service', label: 'Chất lượng phục vụ' },
    { value: 'food', label: 'Đồ uống & Thức ăn' },
    { value: 'atmosphere', label: 'Không gian & Âm nhạc' },
    { value: 'price', label: 'Giá cả' },
    { value: 'cleanliness', label: 'Vệ sinh' },
    { value: 'suggestion', label: 'Đề xuất cải thiện' },
    { value: 'compliment', label: 'Khen ngợi' },
    { value: 'other', label: 'Khác' }
  ];

  const ratings = [
    { value: '5', label: '⭐⭐⭐⭐⭐ Xuất sắc' },
    { value: '4', label: '⭐⭐⭐⭐ Tốt' },
    { value: '3', label: '⭐⭐⭐ Bình thường' },
    { value: '2', label: '⭐⭐ Cần cải thiện' },
    { value: '1', label: '⭐ Không hài lòng' }
  ];

  const handleInputChange = (field: keyof FeedbackFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName || !formData.phone || !formData.message) {
      toast({
        title: 'Thông tin chưa đầy đủ',
        description: 'Vui lòng điền họ tên, số điện thoại và nội dung góp ý',
        variant: 'destructive'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call to send feedback
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Cảm ơn bạn đã góp ý!',
        description: 'RAN đã nhận được phản hồi của bạn và sẽ xem xét cẩn thận.',
      });
      
      setShowThankYou(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          branch: '',
          rating: '',
          category: '',
          subject: '',
          message: ''
        });
        setShowThankYou(false);
        onClose();
      }, 3000);
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h3 className="font-playfair text-xl font-bold">Cảm ơn bạn!</h3>
            <p className="text-muted-foreground">
              Góp ý của bạn rất quan trọng với RAN. Chúng tôi sẽ xem xét và cải thiện dịch vụ tốt hơn.
            </p>
            <div className="text-sm text-muted-foreground">
              Cửa sổ này sẽ tự động đóng sau 3 giây...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-center">Góp ý & Review cho RAN</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card className="bg-gradient-hero">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold">RAN lắng nghe bạn mỗi ngày</h3>
                  <p className="text-sm text-muted-foreground">
                    Chia sẻ trải nghiệm của bạn để RAN ngày càng hoàn thiện hơn
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0901234567"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email (tùy chọn)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@gmail.com"
              />
            </div>

            {/* Feedback Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="branch">Chi nhánh</Label>
                <Select onValueChange={(value) => handleInputChange('branch', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chi nhánh" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Đánh giá tổng thể</Label>
                <Select onValueChange={(value) => handleInputChange('rating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức đánh giá" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratings.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value}>
                        {rating.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Loại góp ý</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại góp ý" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Tiêu đề</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Tóm tắt ngắn gọn góp ý của bạn"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">Nội dung góp ý *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Chia sẻ chi tiết trải nghiệm của bạn tại RAN. Điều gì bạn thích? Điều gì cần cải thiện? Đề xuất của bạn là gì?"
                rows={4}
                required
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Gửi góp ý
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            <p>
              💝 Mọi góp ý của bạn đều được RAN ghi nhận và trân trọng. 
              <br />Cảm ơn bạn đã đồng hành cùng RAN!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;