import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  Coffee, 
  Wifi, 
  Car, 
  CreditCard, 
  Star, 
  Calendar, 
  Camera, 
  Music, 
  Utensils, 
  Shield, 
  Zap, 
  Heart, 
  Award,
  Navigation as NavigationIcon,
  Share2,
  BookOpen,
  Headphones,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BranchInfo = () => {
  const { toast } = useToast();
  const [selectedBranch, setSelectedBranch] = useState("ngo-quyen");

  const branches = {
    "ngo-quyen": {
      id: "ngo-quyen",
      name: "RAN Coffee - Tea",
      address: "40 Ngô Quyền, Hà Nội",
      phone: "056 981 0000",
      email: "Ran40nq@gmail.com",
      type: "Flagship Store",
      openingHours: {
        weekdays: "07:00 - 22:00",
        weekend: "07:00 - 23:00"
      },
      capacity: "Trong nhà: 30 người + Ngoài sân: 50 người",
      features: [
        { icon: Wifi, name: "WiFi miễn phí", description: "Tốc độ cao, ổn định" },
        { icon: Car, name: "Bãi đỗ xe", description: "50 chỗ đỗ xe máy, 10 chỗ ô tô" },
        { icon: CreditCard, name: "Thanh toán đa dạng", description: "Tiền mặt, thẻ, QR Pay" },
        { icon: Music, name: "AI Music Studio", description: "Trải nghiệm tạo nhạc AI" },
        { icon: Camera, name: "Không gian sống ảo", description: "Check-in đẹp, ánh sáng tự nhiên" },
        { icon: BookOpen, name: "Thư viện sách", description: "200+ đầu sách đa thể loại" }
      ],
      specialties: [
        {
          name: "RAN Signature Blend",
          description: "Cà phê pha chế độc quyền với 5 loại hạt arabica",
          price: "85,000 VNĐ",
          rating: 4.9
        },
        {
          name: "Golden Milk Tea",
          description: "Trà sữa nghệ vàng với công thức bí mật",
          price: "65,000 VNĐ",
          rating: 4.8
        },
        {
          name: "AI Music Experience",
          description: "Tạo nhạc cá nhân hóa trong khi thưởng thức đồ uống",
          price: "Miễn phí",
          rating: 5.0
        }
      ],
      stats: {
        monthlyVisitors: 12500,
        averageRating: 4.8,
        totalReviews: 1247,
        aiTracksCreated: 3420
      },
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      manager: {
        name: "Nguyễn Minh Anh",
        position: "Store Manager",
        experience: "5 năm kinh nghiệm F&B",
        specialization: "Coffee Art & AI Music"
      }
    },
    "nguyen-binh-khiem": {
      id: "nguyen-binh-khiem",
      name: "RAN Bitro",
      address: "35 Nguyễn Bỉnh Khiêm, Hà Nội",
      phone: "056 981 0000",
      email: "Ran35nbk@gmail.com",
      type: "Bistro & Coworking",
      openingHours: {
        weekdays: "06:30 - 23:30",
        weekend: "07:00 - 24:00"
      },
      capacity: "Trong nhà: Phòng to 40 người, Phòng nhỏ 20 người, Phòng VIP 10 người + Ngoài sân: 10 người",
      features: [
        { icon: Wifi, name: "WiFi tốc độ cao", description: "Fiber 1Gbps, phù hợp làm việc" },
        { icon: Zap, name: "Sạc không dây", description: "Tích hợp tại mọi bàn" },
        { icon: Users, name: "Phòng họp riêng", description: "3 phòng họp, booking miễn phí" },
        { icon: Utensils, name: "Thực đơn đa dạng", description: "Từ đồ uống đến món chính" },
        { icon: Headphones, name: "Silent Zone", description: "Khu vực yên tĩnh tuyệt đối" },
        { icon: Palette, name: "Art Gallery", description: "Triển lãm nghệ thuật thường xuyên" }
      ],
      specialties: [
        {
          name: "Productivity Boost Coffee",
          description: "Cà phê tăng cường năng suất với L-theanine",
          price: "95,000 VNĐ",
          rating: 4.9
        },
        {
          name: "Coworker's Combo",
          description: "Set đồ uống + bánh ngọt cho cả ngày làm việc",
          price: "150,000 VNĐ",
          rating: 4.7
        },
        {
          name: "Meeting Package",
          description: "Phòng họp + đồ uống cho 6 người",
          price: "300,000 VNĐ",
          rating: 4.8
        }
      ],
      stats: {
        monthlyVisitors: 8900,
        averageRating: 4.7,
        totalReviews: 892,
        coworkingHours: 15600
      },
      gallery: [
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      manager: {
        name: "Trần Văn Đức",
        position: "Bistro Manager",
        experience: "7 năm kinh nghiệm Coworking",
        specialization: "Business Development & Community"
      }
    }
  };

  const currentBranch = branches[selectedBranch as keyof typeof branches];

  const shareInfo = () => {
    const shareData = {
      title: currentBranch.name,
      text: `${currentBranch.name} - ${currentBranch.address}\nĐiện thoại: ${currentBranch.phone}\nEmail: ${currentBranch.email}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        toast({
          title: "Đã chia sẻ thành công",
          description: "Thông tin chi nhánh đã được chia sẻ"
        });
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Đã sao chép thông tin",
          description: "Thông tin chi nhánh đã được sao chép vào clipboard"
        });
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareData.text);
      toast({
        title: "Đã sao chép thông tin",
        description: "Thông tin chi nhánh đã được sao chép vào clipboard"
      });
    }
  };

  const getDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentBranch.address)}`;
    window.open(googleMapsUrl, '_blank');
    toast({
      title: "Đang mở Google Maps",
      description: "Chỉ đường đến " + currentBranch.name
    });
  };

  const bookTable = () => {
    toast({
      title: "Đặt bàn thành công",
      description: "Chúng tôi sẽ liên hệ xác nhận trong 15 phút"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                Chi nhánh
              </Badge>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Thông tin <span className="text-primary">Chi nhánh</span>
            </h1>
            <p className="font-inter text-lg md:text-xl mb-8 text-white/90 max-w-3xl">
              Khám phá không gian độc đáo, dịch vụ chuyên nghiệp và trải nghiệm đặc biệt 
              tại từng chi nhánh RAN Mixology
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center">
                <Coffee className="w-5 h-5 mr-2 text-primary" />
                <span>2 chi nhánh</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                <span>21,400+ khách/tháng</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                <span>4.8/5 đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Branch Selector */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              Chọn chi nhánh
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(branches).map(([key, branch]) => (
                <Button
                  key={key}
                  variant={selectedBranch === key ? "default" : "outline"}
                  className={`${selectedBranch === key ? 'bg-gradient-accent text-primary-foreground' : ''} px-6 py-3`}
                  onClick={() => setSelectedBranch(key)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {branch.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Branch Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Info */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-accent/10 border-primary/30 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {currentBranch.name}
                  </CardTitle>
                  <Badge className="w-fit bg-primary/20 text-primary">
                    {currentBranch.type}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground">{currentBranch.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">{currentBranch.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">{currentBranch.email}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="text-sm text-foreground">
                      <div>T2-T6: {currentBranch.openingHours.weekdays}</div>
                      <div>T7-CN: {currentBranch.openingHours.weekend}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="text-sm text-foreground">
                      <div className="font-medium mb-1">Sức chứa:</div>
                      <div>{currentBranch.capacity}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-gradient-accent text-primary-foreground" onClick={getDirections}>
                      <NavigationIcon className="w-4 h-4 mr-2" />
                      Chỉ đường
                    </Button>
                    <Button variant="outline" onClick={shareInfo}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-card/70 border-primary/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Khách/tháng:</span>
                    <span className="font-semibold text-foreground">
                      {currentBranch.stats.monthlyVisitors.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Đánh giá TB:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">
                        {currentBranch.stats.averageRating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tổng đánh giá:</span>
                    <span className="font-semibold text-foreground">
                      {currentBranch.stats.totalReviews.toLocaleString()}
                    </span>
                  </div>
                  
                  {currentBranch.stats.aiTracksCreated && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bài AI tạo:</span>
                      <span className="font-semibold text-foreground">
                        {currentBranch.stats.aiTracksCreated.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {currentBranch.stats.coworkingHours && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Giờ coworking:</span>
                      <span className="font-semibold text-foreground">
                        {currentBranch.stats.coworkingHours.toLocaleString()}h
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Manager Info */}
              <Card className="bg-card/70 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Quản lý chi nhánh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-hero rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {currentBranch.manager.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {currentBranch.manager.position}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      {currentBranch.manager.experience}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {currentBranch.manager.specialization}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Info */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="features">Tiện ích</TabsTrigger>
                  <TabsTrigger value="specialties">Đặc sản</TabsTrigger>
                  <TabsTrigger value="gallery">Hình ảnh</TabsTrigger>
                  <TabsTrigger value="booking">Đặt bàn</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentBranch.features.map((feature, index) => (
                      <Card key={index} className="bg-card/50 border-primary/10">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">
                                {feature.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="specialties" className="mt-6">
                  <div className="space-y-4">
                    {currentBranch.specialties.map((specialty, index) => (
                      <Card key={index} className="bg-card/50 border-primary/10">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-foreground">
                                  {specialty.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium text-foreground">
                                    {specialty.rating}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {specialty.description}
                              </p>
                              <Badge className="bg-primary/20 text-primary">
                                {specialty.price}
                              </Badge>
                            </div>
                            <Button size="sm" className="bg-gradient-accent text-primary-foreground">
                              <Heart className="w-4 h-4 mr-2" />
                              Yêu thích
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentBranch.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${currentBranch.name} - Hình ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="booking" className="mt-6">
                  <Card className="bg-gradient-accent/10 border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Đặt bàn tại {currentBranch.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Ngày đến
                          </label>
                          <input 
                            type="date" 
                            className="w-full p-3 bg-background border border-primary/30 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Giờ đến
                          </label>
                          <select className="w-full p-3 bg-background border border-primary/30 rounded-lg">
                            <option>08:00</option>
                            <option>10:00</option>
                            <option>12:00</option>
                            <option>14:00</option>
                            <option>16:00</option>
                            <option>18:00</option>
                            <option>20:00</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Số người
                          </label>
                          <select className="w-full p-3 bg-background border border-primary/30 rounded-lg">
                            <option>1 người</option>
                            <option>2 người</option>
                            <option>3-4 người</option>
                            <option>5-8 người</option>
                            <option>Trên 8 người</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Loại bàn
                          </label>
                          <select className="w-full p-3 bg-background border border-primary/30 rounded-lg">
                            <option>Bàn thường</option>
                            <option>Bàn cửa sổ</option>
                            <option>Bàn riêng tư</option>
                            <option>Bàn coworking</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Ghi chú đặc biệt
                        </label>
                        <textarea 
                          className="w-full p-3 bg-background border border-primary/30 rounded-lg min-h-[80px]"
                          placeholder="Yêu cầu đặc biệt, sinh nhật, kỷ niệm..."
                        ></textarea>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-accent text-primary-foreground py-3 text-lg font-semibold"
                        onClick={bookTable}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Đặt bàn ngay
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 inline mr-1" />
                        Miễn phí đặt bàn • Xác nhận trong 15 phút
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BranchInfo;