import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, MapPin, DollarSign, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FranchiseFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  investmentBudget: string;
  experience: string;
  preferredLocation: string;
  message: string;
}

const FranchiseModal: React.FC<FranchiseModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FranchiseFormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    investmentBudget: '',
    experience: '',
    preferredLocation: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);

  const franchisePackages = [
    {
      name: 'RAN Coffee - Tea',
      investment: '800 triệu - 1.2 tỷ VNĐ',
      area: '80-120m²',
      roi: '18-24 tháng',
      features: ['Concept Coffee & Tea', 'Không gian cozy', 'Menu đa dạng', 'Hỗ trợ marketing']
    },
    {
      name: 'RAN Bitro',
      investment: '1.5 - 2.5 tỷ VNĐ',
      area: '150-250m²',
      roi: '24-30 tháng',
      features: ['Bistro cao cấp', 'Live music', 'Cocktail bar', 'Event space']
    },
    {
      name: 'RAN Mixology',
      investment: '2.5 - 4 tỷ VNĐ',
      area: '200-400m²',
      roi: '30-36 tháng',
      features: ['Flagship store', 'Mixology workshop', 'DJ booth', 'Rooftop garden']
    }
  ];

  const handleInputChange = (field: keyof FranchiseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.city || !formData.investmentBudget) {
      toast({
        title: 'Thông tin chưa đầy đủ',
        description: 'Vui lòng điền đầy đủ thông tin bắt buộc',
        variant: 'destructive'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Đăng ký thành công!',
        description: 'Chúng tôi sẽ liên hệ với bạn trong vòng 24h. Brochure đã được gửi qua email.',
      });
      
      setShowBrochure(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        investmentBudget: '',
        experience: '',
        preferredLocation: '',
        message: ''
      });
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

  const downloadBrochure = () => {
    // Simulate brochure download
    toast({
      title: 'Đang tải xuống...',
      description: 'Brochure nhượng quyền RAN Mixology đang được tải về máy của bạn',
    });
  };

  if (showBrochure) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-center">Cảm ơn bạn đã quan tâm đến RAN!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <p className="text-lg text-muted-foreground">
                Thông tin của bạn đã được ghi nhận. Đội ngũ RAN sẽ liên hệ trong vòng 24h.
              </p>
            </div>
            
            <Card className="bg-gradient-hero">
              <CardHeader>
                <CardTitle className="text-center font-playfair">Brochure Nhượng Quyền RAN</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={downloadBrochure} className="bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống Brochure (PDF)
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Brochure chi tiết đã được gửi qua email: {formData.email}
                </p>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button onClick={() => { setShowBrochure(false); onClose(); }} variant="outline">
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-center">Nhượng Quyền RAN Mixology</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Franchise Packages */}
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold">Gói Nhượng Quyền</h3>
            
            {franchisePackages.map((pkg, index) => (
              <Card key={index} className="border-primary/20 hover:shadow-glow transition-all">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg">{pkg.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{pkg.investment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Diện tích: {pkg.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span>ROI: {pkg.roi}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pkg.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-gradient-accent text-primary-foreground">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">Hỗ trợ từ RAN:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Đào tạo vận hành 2 tuần</li>
                  <li>• Thiết kế không gian miễn phí</li>
                  <li>• Marketing grand opening</li>
                  <li>• Hỗ trợ kỹ thuật 24/7</li>
                  <li>• Cung cấp nguyên liệu độc quyền</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right: Registration Form */}
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold">Đăng Ký Nhượng Quyền</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Thành phố *</Label>
                  <Select onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                      <SelectItem value="haiphong">Hải Phòng</SelectItem>
                      <SelectItem value="cantho">Cần Thơ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="investmentBudget">Ngân sách đầu tư *</Label>
                  <Select onValueChange={(value) => handleInputChange('investmentBudget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức đầu tư" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="800m-1.2b">800 triệu - 1.2 tỷ</SelectItem>
                      <SelectItem value="1.2b-2b">1.2 - 2 tỷ</SelectItem>
                      <SelectItem value="2b-4b">2 - 4 tỷ</SelectItem>
                      <SelectItem value="4b+">Trên 4 tỷ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="experience">Kinh nghiệm F&B</Label>
                <Select onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức độ kinh nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Chưa có kinh nghiệm</SelectItem>
                    <SelectItem value="1-2years">1-2 năm</SelectItem>
                    <SelectItem value="3-5years">3-5 năm</SelectItem>
                    <SelectItem value="5+years">Trên 5 năm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="preferredLocation">Vị trí mong muốn</Label>
                <Input
                  id="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                  placeholder="Quận/Huyện, khu vực cụ thể..."
                />
              </div>
              
              <div>
                <Label htmlFor="message">Tin nhắn</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Chia sẻ thêm về kế hoạch kinh doanh của bạn..."
                  rows={3}
                />
              </div>
              
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
                    'Gửi đăng ký'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseModal;