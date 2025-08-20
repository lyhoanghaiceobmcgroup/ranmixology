import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RegistrationModal from "@/components/RegistrationModal";
import { useState } from "react";
import { 
  Store, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Coffee,
  Music,
  Brain,
  DollarSign,
  Calendar,
  Building,
  Download,
  BookOpen,
  Target,
  Leaf,
  BarChart3,
  Globe,
  Settings,
  GraduationCap,
  Package,
  Megaphone,
  Headphones,
  FileText,
  Zap,
  Clock,
  TrendingDown
} from "lucide-react";

const Franchise = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const handleRegistrationClick = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handlePackageConsultation = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsRegistrationModalOpen(true);
  };

  const handleBrochureRequest = () => {
    // Mockup data for brochure request
    const brochureData = {
      title: "RAN Franchise Brochure 2024",
      pages: 24,
      language: "Vietnamese",
      format: "PDF",
      size: "8.5MB",
      content: [
        "Tổng quan thương hiệu RAN",
        "Mô hình kinh doanh độc đáo",
        "Các gói nhượng quyền chi tiết",
        "Hỗ trợ từ trung tâm RAN",
        "Phân tích tài chính & ROI",
        "Quy trình đăng ký nhượng quyền",
        "Câu chuyện thành công từ đối tác"
      ],
      downloadUrl: "/brochures/ran-franchise-2024.pdf",
      requestTime: new Date().toISOString()
    };
    
    // Simulate download process
    console.log("Brochure request:", brochureData);
    alert(`Brochure RAN Franchise (${brochureData.pages} trang, ${brochureData.size}) sẽ được gửi đến email của bạn trong vòng 5 phút. Cảm ơn bạn đã quan tâm đến RAN!`);
  };
  const differencePoints = [
    {
      icon: Brain,
      title: "Trải nghiệm cảm xúc hóa (AI)",
      description: "Bản nhạc AI cá nhân mỗi lần giao dịch → loyalty → khác biệt"
    },
    {
      icon: Leaf,
      title: "Đồ uống không cồn + sáng tạo",
      description: "Hướng tới giới trẻ – nghệ thuật – sức khỏe – an toàn pháp lý"
    },
    {
      icon: Settings,
      title: "Vận hành chuẩn SOP",
      description: "Chuỗi cung ứng định lượng, công nghệ POS – CRM – AI báo cáo"
    },
    {
      icon: MapPin,
      title: "Linh hoạt mô hình & địa điểm",
      description: "Phù hợp thành thị – tỉnh lẻ – du lịch – kiosk sáng tạo"
    }
  ];

  const franchisePackages = [
    {
      name: "RAN Lite",
      area: "40–70m²",
      investment: "700tr – 1.2 tỷ",
      support: "Đào tạo + POS + Menu",
      target: "Khu dân cư, phố thương mại tỉnh"
    },
    {
      name: "RAN Signature",
      area: "80–150m²",
      investment: "1.5 – 2.5 tỷ",
      support: "Full đào tạo – Kiến trúc – AI + CRM + POS",
      target: "Thành phố lớn, trung tâm thương mại",
      popular: true
    },
    {
      name: "RAN Garden",
      area: "100m² sân vườn",
      investment: "1.8 – 3.0 tỷ",
      support: "Đồng hành full branding + vận hành",
      target: "Khu du lịch, nghỉ dưỡng"
    },
    {
      name: "RAN Kiosk",
      area: "20–30m²",
      investment: "400 – 600 triệu",
      support: "Dễ triển khai tại campus, TTTM, phố cổ",
      target: "Khu học đường, khu văn phòng"
    }
  ];

  const supportServices = [
    {
      icon: GraduationCap,
      title: "Đào tạo đội ngũ toàn diện",
      description: "barista – FOH – quản lý – truyền thông"
    },
    {
      icon: FileText,
      title: "SOP từng bộ phận",
      description: "CRM báo cáo + AI phân tích"
    },
    {
      icon: Package,
      title: "Chuỗi cung ứng nguyên liệu",
      description: "định lượng – định kỳ"
    },
    {
      icon: Megaphone,
      title: "Truyền thông quốc gia",
      description: "đồng bộ + cá nhân hóa từng chi nhánh"
    },
    {
      icon: Headphones,
      title: "Hệ thống tạo nhạc & loyalty",
      description: "độc quyền"
    },
    {
      icon: Target,
      title: "Đồng hành mở mới",
      description: "giám sát vận hành định kỳ – kiểm toán chất lượng"
    }
  ];

  const performanceStats = [
    { label: "Chi phí khởi tạo", value: "1.6 – 2.0 tỷ VNĐ" },
    { label: "Thời gian hoàn vốn", value: "14 – 18 tháng" },
    { label: "Tỉ suất lợi nhuận ròng", value: "18% – 25%" },
    { label: "Khách/ngày trung bình", value: "180 – 250" },
    { label: "Tỉ lệ quay lại (loyalty)", value: ">35%" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              RAN <span className="text-primary">FRANCHISE</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              "Cùng bạn mang nghệ thuật vị giác và bản nhạc cá nhân đến khắp Việt Nam."
            </p>
          </div>
        </div>
      </section>

      {/* Why RAN is Different */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Vì sao RAN khác biệt?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differencePoints.map((point, index) => (
              <Card key={index} className="bg-card/70 border-primary/20 hover:shadow-glow transition-all text-center">
                <CardContent className="p-6">
                  <point.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-playfair text-lg font-bold mb-3">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Opportunities */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Cơ hội nhượng quyền tại Việt Nam
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card/70 border-primary/20">
              <CardHeader>
                <CardTitle className="font-playfair text-xl flex items-center">
                  <Building className="w-6 h-6 mr-3 text-primary" />
                  Thành Phố Lớn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Mô hình:</strong> RAN Signature Full (80–150m²)
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Tệp khách:</strong> Giới trẻ thành thị, dân văn phòng, khách nước ngoài
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Lợi thế:</strong> Khả năng tổ chức sự kiện, DJ night, mixology show
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-primary/20">
              <CardHeader>
                <CardTitle className="font-playfair text-xl flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  Khu vực Du lịch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Mô hình:</strong> RAN Garden / RAN Retreat
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Tệp khách:</strong> Khách nội địa nghỉ dưỡng, Gen Z, artist
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Lợi thế:</strong> Không gian mở, tăng check-in, ưu thế hình ảnh
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-primary/20">
              <CardHeader>
                <CardTitle className="font-playfair text-xl flex items-center">
                  <Users className="w-6 h-6 mr-3 text-primary" />
                  Khu dân cư
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Mô hình:</strong> RAN Lite / RAN Kiosk (40–70m²)
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Tệp khách:</strong> Khách vãng lai, giới trẻ – học sinh – sinh viên
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Lợi thế:</strong> Thiết kế linh hoạt, vốn thấp, dễ triển khai
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Franchise Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Gói nhượng quyền linh hoạt
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {franchisePackages.map((pkg, index) => (
              <Card key={index} className={`bg-card/70 border-primary/20 hover:shadow-glow transition-all ${
                pkg.popular ? "scale-105 border-primary" : ""
              }`}>
                <CardContent className="p-6">
                  {pkg.popular && (
                    <Badge className="bg-gradient-accent text-primary-foreground mb-4">
                      Phổ biến nhất
                    </Badge>
                  )}
                  <h3 className="font-playfair text-xl font-bold mb-3">{pkg.name}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm"><strong>Diện tích:</strong> {pkg.area}</p>
                    <p className="text-sm"><strong>Đầu tư:</strong> {pkg.investment}</p>
                    <p className="text-sm"><strong>Hỗ trợ:</strong> {pkg.support}</p>
                    <p className="text-sm text-muted-foreground"><strong>Phù hợp:</strong> {pkg.target}</p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow"
                    onClick={() => handlePackageConsultation(pkg.name)}
                  >
                    Tư vấn gói này
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Hỗ trợ từ trung tâm RAN
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {supportServices.map((service, index) => (
              <Card key={index} className="bg-card/70 border-primary/20 hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="font-playfair text-lg font-bold mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Số liệu hiệu suất & lợi nhuận mẫu
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            (RAN Signature 80m² - giá trị trung bình)
          </p>
          
          <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {performanceStats.map((stat, index) => (
              <Card key={index} className="bg-card/70 border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/70 border-primary/20">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-center">
                  Đăng ký tư vấn nhượng quyền
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ tên</Label>
                    <Input id="name" placeholder="Nhập họ tên của bạn" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Nhập email của bạn" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Khu vực muốn mở</Label>
                    <Input id="location" placeholder="Thành phố/Tỉnh" />
                  </div>
                  <div>
                    <Label htmlFor="model">Mô hình quan tâm</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn mô hình" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lite">RAN Lite</SelectItem>
                        <SelectItem value="signature">RAN Signature</SelectItem>
                        <SelectItem value="garden">RAN Garden</SelectItem>
                        <SelectItem value="kiosk">RAN Kiosk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="questions">Câu hỏi / kỳ vọng đặc biệt</Label>
                  <Textarea id="questions" placeholder="Chia sẻ mong muốn của bạn..." />
                </div>
                
                <Button 
                  className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow"
                  onClick={handleRegistrationClick}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Gửi đăng ký tư vấn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-gradient-hero border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
                Sẵn sàng khởi nghiệp cùng RAN?
              </h2>
              <p className="font-inter text-muted-foreground mb-8">
                Liên hệ team nhượng quyền RAN để được tư vấn chi tiết và lập kế hoạch kinh doanh
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-semibold">Hotline Nhượng quyền</span>
                  </div>
                  <p className="text-muted-foreground">056 981 0000</p>
                </div>
                <div className="text-left">
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-semibold">Email</span>
                  </div>
                  <p className="text-muted-foreground">franchise.ran@gmail.com</p>
                </div>
              </div>
              <Button 
                className="bg-gradient-accent text-primary-foreground hover:shadow-glow"
                onClick={handleBrochureRequest}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Nhận brochure chi tiết
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      
      <RegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        eventType="Nhượng quyền"
        eventTitle={selectedPackage ? `Tư vấn gói ${selectedPackage}` : "Tư vấn nhượng quyền RAN"}
      />
    </div>
  );
};

export default Franchise;
