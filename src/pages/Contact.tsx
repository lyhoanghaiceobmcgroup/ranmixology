import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, MessageSquare, Facebook, Clock, Send, User, Building2, FileText, Users, Coffee, Mic, Briefcase, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroInterior from "@/assets/hero-interior.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    message: "",
    agreeToPolicy: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "🎧 Cảm ơn bạn!",
      description: "RAN đang tạo một bản nhạc hồi âm dành riêng cho bạn.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      purpose: "",
      message: "",
      agreeToPolicy: false
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Tổng đài",
      content: "056 981 0000",
      action: "tel:0569810000"
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "40 Ngô Quyền, Hà Nội",
      action: "https://maps.google.com"
    },
    {
      icon: Mail,
      title: "Email CSKH",
      content: "RanMixology@gmail.com",
      action: "mailto:RanMixology@gmail.com"
    },
    {
      icon: Building2,
      title: "Nhượng quyền",
      content: "franchise.ran@gmail.com",
      action: "mailto:franchise.ran@gmail.com"
    }
  ];

  const departments = [
    {
      icon: Coffee,
      title: "Franchise",
      description: "Gửi yêu cầu mở chi nhánh",
      action: "/franchise"
    },
    {
      icon: Mic,
      title: "Truyền thông",
      description: "Xem hồ sơ truyền thông RAN",
      action: "#"
    },
    {
      icon: Users,
      title: "Tuyển dụng",
      description: "Ứng tuyển ngay",
      action: "#"
    }
  ];

  const branches = [
    {
      name: "RAN Coffee - Tea",
      address: "40 Ngô Quyền, Hà Nội",
      hours: "7:00 - 23:00",
      phone: "056 981 0000"
    },
    {
      name: "RAN Bitro",
      address: "35 Nguyễn Bỉnh Khiêm, Hà Nội",
      hours: "7:00 - 23:00",
      phone: "056 981 0000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${heroInterior}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              📬 RAN luôn sẵn sàng lắng nghe bạn
            </h1>
            <p className="font-inter text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              Hãy để lại lời nhắn – đặt bàn – hợp tác – hoặc đơn giản là một lời chào.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-elegant transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-playfair font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <a 
                            href={info.action}
                            className="font-inter text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.content}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-foreground">Theo dõi RAN</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Branch Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-foreground">Chi nhánh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {branches.map((branch, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-inter font-semibold text-foreground">{branch.name}</h4>
                      <p className="text-muted-foreground text-sm">{branch.address}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {branch.hours}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {branch.phone}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-foreground">
                    Gửi tin nhắn cho RAN
                  </CardTitle>
                  <CardDescription>
                    Mọi trải nghiệm bắt đầu bằng một kết nối tinh tế – bạn nhắn, RAN lắng nghe.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ tên *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Nhập họ tên của bạn"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Nhập số điện thoại"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Nhập email của bạn"
                      />
                    </div>

                    <div>
                      <Label htmlFor="purpose">Tôi muốn liên hệ về</Label>
                      <Select onValueChange={(value) => setFormData({...formData, purpose: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mục đích liên hệ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Đặt bàn / sự kiện</SelectItem>
                          <SelectItem value="feedback">Góp ý món / dịch vụ</SelectItem>
                          <SelectItem value="technical">Vấn đề kỹ thuật AI / QR</SelectItem>
                          <SelectItem value="franchise">Đăng ký franchise</SelectItem>
                          <SelectItem value="media">Hợp tác truyền thông / KOL</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Nội dung</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Nhập nội dung tin nhắn..."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="policy"
                        checked={formData.agreeToPolicy}
                        onCheckedChange={(checked) => setFormData({...formData, agreeToPolicy: checked as boolean})}
                      />
                      <Label htmlFor="policy" className="text-sm">
                        Tôi đồng ý với chính sách bảo mật của RAN
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-accent hover:shadow-glow"
                      disabled={!formData.agreeToPolicy}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Gửi yêu cầu
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Kết nối với các bộ phận khác
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi có các bộ phận chuyên biệt để phục vụ tốt nhất cho bạn
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-elegant transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <dept.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair font-semibold text-foreground mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {dept.description}
                  </p>
                  <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    Liên hệ ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Tìm RAN gần bạn
            </h2>
            <p className="text-muted-foreground">
              Khám phá các chi nhánh RAN trên khắp Việt Nam
            </p>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Bản đồ tương tác Google Maps sẽ được tích hợp tại đây
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
