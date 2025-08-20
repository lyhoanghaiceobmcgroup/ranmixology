import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FranchiseModal from "@/components/FranchiseModal";
import FeedbackModal from "@/components/FeedbackModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Music, 
  Coffee, 
  Heart, 
  Brain, 
  Smartphone, 
  Handshake,
  MapPin,
  Star,
  Play,
  Instagram,
  Mail,
  Phone,
  Calendar,
  Users,
  Leaf,
  Lightbulb,
  Sparkles,
  Award
} from "lucide-react";
import { useState } from "react";

const About = () => {
  const { toast } = useToast();
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Location data for branches
  const branches = [
    { name: "RAN Mixology - Hà Nội", lat: 21.0285, lng: 105.8542, address: "40 Ngô Quyền, Hà Nội" },
    { name: "RAN Bitro - TP.HCM", lat: 10.7769, lng: 106.7009, address: "125 Bà Triệu, Quận 1, TP.HCM" },
    { name: "RAN Coffee Tea - Đà Nẵng", lat: 16.0544, lng: 108.2022, address: "88 Trần Phú, Đà Nẵng" }
  ];

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find nearest branch using geolocation
  const findNearestBranch = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Không hỗ trợ định vị",
        description: "Trình duyệt của bạn không hỗ trợ tính năng định vị",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        let nearestBranch = branches[0];
        let minDistance = calculateDistance(userLat, userLng, branches[0].lat, branches[0].lng);
        
        branches.forEach(branch => {
          const distance = calculateDistance(userLat, userLng, branch.lat, branch.lng);
          if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = branch;
          }
        });
        
        toast({
          title: "Chi nhánh gần nhất",
          description: `${nearestBranch.name} - ${nearestBranch.address} (cách ${minDistance.toFixed(1)}km)`,
        });
      },
      (error) => {
        toast({
          title: "Không thể xác định vị trí",
          description: "Vui lòng cho phép truy cập vị trí để tìm chi nhánh gần nhất",
          variant: "destructive"
        });
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              RAN MIXOLOGY
            </h1>
            <p className="font-inter text-lg md:text-xl mb-8 text-white/90">
              Trạm dừng vị giác - Bitro - Coffee - Tea
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={findNearestBranch}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Tìm chi nhánh
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setIsFranchiseModalOpen(true)}
              >
                Gửi hồ sơ
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setIsFeedbackModalOpen(true)}
              >
                Theo dõi RAN
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center text-white/80">
                <Phone className="w-4 h-4 mr-2" />
                <span>056 981 0000</span>
              </div>
              <div className="flex items-center text-white/80">
                <Mail className="w-4 h-4 mr-2" />
                <span>RanMixology@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Brand Story */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Câu chuyện <span className="text-primary">RAN MIXOLOGY</span>
            </h2>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-8">
              Sinh ra từ niềm đam mê với nghệ thuật pha chế và âm nhạc, RAN Mixology không chỉ là một không gian thưởng thức đồ uống, 
              mà còn là nơi kết nối những tâm hồn yêu thích sự tinh tế trong từng giọt cà phê, từng ly cocktail và từng giai điệu.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-card/50 border-primary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-3">Nghệ thuật pha chế</h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    Kết hợp tinh hoa của mixology quốc tế với hương vị đặc trưng Việt Nam
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-primary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Music className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-3">AI Music Generation</h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    Công nghệ AI tạo nhạc độc đáo, mang đến trải nghiệm âm thanh cá nhân hóa
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-primary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-3">Trải nghiệm cảm xúc</h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    Mỗi ly đồ uống là một câu chuyện, mỗi giai điệu là một cảm xúc
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* International F&B Philosophy */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
                Triết lý F&B Quốc tế
              </h3>
              <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                RAN Mixology được xây dựng trên nền tảng triết lý F&B quốc tế hiện đại, nơi mà chất lượng, 
                sáng tạo và trải nghiệm khách hàng là những giá trị cốt lõi. Chúng tôi tin rằng mỗi món đồ uống 
                không chỉ đơn thuần là sự kết hợp của các nguyên liệu, mà còn là nghệ thuật kể chuyện qua vị giác.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Leaf className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-foreground mb-1">Nguyên liệu tự nhiên</h4>
                    <p className="font-inter text-sm text-muted-foreground">
                      Chọn lọc những nguyên liệu tươi ngon nhất từ các vùng trồng uy tín trên thế giới
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-foreground mb-1">Sáng tạo không giới hạn</h4>
                    <p className="font-inter text-sm text-muted-foreground">
                      Kết hợp kỹ thuật pha chế truyền thống với công nghệ hiện đại
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Sparkles className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-foreground mb-1">Trải nghiệm đa giác quan</h4>
                    <p className="font-inter text-sm text-muted-foreground">
                      Kết hợp vị giác, thị giác, thính giác để tạo nên những khoảnh khắc đáng nhớ
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="RAN Mixology Philosophy" 
                className="rounded-lg shadow-elegant w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
            </div>
          </div>

          {/* Global Standards */}
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              Tiêu chuẩn Quốc tế
            </h3>
            <p className="font-inter text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Áp dụng các tiêu chuẩn F&B quốc tế nghiêm ngặt, từ quy trình chọn lọc nguyên liệu, 
              kỹ thuật pha chế, đến dịch vụ khách hàng. RAN Mixology cam kết mang đến trải nghiệm 
              đẳng cấp thế giới ngay tại Việt Nam.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-inter font-semibold text-foreground mb-2">Chứng nhận ISO</h4>
                <p className="font-inter text-xs text-muted-foreground">An toàn thực phẩm</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-inter font-semibold text-foreground mb-2">Đội ngũ chuyên nghiệp</h4>
                <p className="font-inter text-xs text-muted-foreground">Barista quốc tế</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-inter font-semibold text-foreground mb-2">Công nghệ AI</h4>
                <p className="font-inter text-xs text-muted-foreground">Cá nhân hóa trải nghiệm</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-inter font-semibold text-foreground mb-2">Ứng dụng thông minh</h4>
                <p className="font-inter text-xs text-muted-foreground">Đặt bàn & thanh toán</p>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Star className="w-8 h-8 text-primary mr-3" />
                  <h3 className="font-playfair text-xl font-bold text-foreground">Tầm nhìn</h3>
                </div>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  Trở thành thương hiệu F&B hàng đầu Việt Nam, tiên phong trong việc ứng dụng công nghệ AI 
                  vào trải nghiệm ẩm thực, mang đến những khoảnh khắc đáng nhớ cho mọi khách hàng.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Handshake className="w-8 h-8 text-primary mr-3" />
                  <h3 className="font-playfair text-xl font-bold text-foreground">Sứ mệnh</h3>
                </div>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  Kết nối con người thông qua nghệ thuật pha chế và âm nhạc, tạo ra những không gian 
                  thư giãn lý tưởng nơi mọi người có thể tận hưởng cuộc sống và chia sẻ những câu chuyện đẹp.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Modals */}
      <FranchiseModal 
        isOpen={isFranchiseModalOpen} 
        onClose={() => setIsFranchiseModalOpen(false)} 
      />
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
};

export default About;
