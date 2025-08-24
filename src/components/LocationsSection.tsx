import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Navigation, Music, Wifi, Car, Star, Users, Headphones, Gift, Coffee, Sparkles, ExternalLink, Facebook } from "lucide-react";
import QuickBookingModal from "./QuickBookingModal";
import { useToast } from "@/hooks/use-toast";
const LocationsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState("nguyen-binh-khiem");
  const [isQuickBookingModalOpen, setIsQuickBookingModalOpen] = useState(false);
  const { toast } = useToast();

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Function to find nearest branch
  const findNearestBranch = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Lỗi định vị",
        description: "Trình duyệt của bạn không hỗ trợ định vị GPS",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Đang định vị...",
      description: "Vui lòng cho phép truy cập vị trí để tìm chi nhánh gần nhất"
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        let nearestBranch = locations[0];
        let minDistance = calculateDistance(userLat, userLng, locations[0].coordinates.lat, locations[0].coordinates.lng);
        
        locations.forEach(location => {
          const distance = calculateDistance(userLat, userLng, location.coordinates.lat, location.coordinates.lng);
          if (distance < minDistance) {
            minDistance = distance;
            nearestBranch = location;
          }
        });
        
        setSelectedLocation(nearestBranch.id);
        toast({
          title: "Đã tìm thấy chi nhánh gần nhất!",
          description: `${nearestBranch.name} - Cách bạn ${minDistance.toFixed(1)} km`
        });
      },
      (error) => {
        let errorMessage = "Không thể xác định vị trí của bạn";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Bạn đã từ chối quyền truy cập vị trí. Vui lòng bật định vị trong cài đặt trình duyệt.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Thông tin vị trí không khả dụng.";
            break;
          case error.TIMEOUT:
            errorMessage = "Yêu cầu định vị đã hết thời gian chờ.";
            break;
        }
        toast({
          title: "Lỗi định vị",
          description: errorMessage,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };
  const locations = [{
    id: "ngo-quyen",
    name: "RAN Signature - Ngô Quyền",
    address: "40 Ngô Quyền, Hoàn Kiếm, Hà Nội",
    phone: "024 3926 2888",
    hours: "07:00 - 22:00",
    image: "/src/assets/branch-ngo-quyen.jpg",
    specialty: "Flagship Store",
    features: ["AI Music Lab", "Rooftop Garden", "Private Tasting Room", "Event Space"],
    description: "Chi nhánh flagship với đầy đủ trải nghiệm RAN độc quyền",
    playlist: "RAN Flagship Vibes",
    coordinates: {
      lat: 21.028511,
      lng: 105.841463
    },
    signatureDrinks: ["RAN Signature Latte", "Golden Harmony Tea"],
    mood: "Premium & Artistic",
    rating: 4.8,
    monthlyVisitors: 2847,
    songsCreated: 1892,
    bestTime: "Sáng 8-10h: Không gian yên tĩnh làm việc",
    specialOffer: "Uống sáng tặng 1 bản nhạc AI miễn phí",
    facebookUrl: "https://facebook.com/ran.ngo.quyen",
    branchUrl: "/locations/ngo-quyen"
  }, {
    id: "nguyen-binh-khiem",
    name: "RAN Signature - Nguyễn Bỉnh Khiêm",
    address: "35 Nguyễn Bỉnh Khiêm, Hai Bà Trưng, Hà Nội",
    phone: "056 981 0000",
    hours: "08:00 - 23:00",
    image: "/src/assets/branch-ha-noi-center.jpg",
    specialty: "Urban Lounge",
    features: ["City View", "Co-working Space", "Fast Service", "Delivery Hub"],
    description: "Không gian hiện đại giữa lòng thành phố",
    playlist: "Urban Energy Mix",
    coordinates: {
      lat: 21.014073,
      lng: 105.847130
    },
    signatureDrinks: ["Urban Rush Coffee", "Metropolis Mocktail"],
    mood: "Dynamic & Energetic",
    rating: 4.6,
    monthlyVisitors: 3254,
    songsCreated: 2106,
    bestTime: "Chiều 14-17h: Không gian co-working sôi động",
    specialOffer: "Happy hour 14-17h: Giảm 20% toàn menu",
    facebookUrl: "https://facebook.com/ran.nguyen.binh.khiem",
    branchUrl: "/locations/nguyen-binh-khiem"
  }];
  const currentLocation = locations.find(loc => loc.id === selectedLocation);
  return <section id="locations" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        

        {/* AI Mood Recommender */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <Card className="bg-gradient-accent/10 border-primary/30">
            
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Location List */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
              Chọn chi nhánh
            </h3>
            <div className="space-y-3 md:space-y-4">
              {locations.map(location => <Card key={location.id} className={`cursor-pointer transition-all duration-300 ${selectedLocation === location.id ? "bg-gradient-accent border-primary shadow-glow" : "bg-card/70 border-primary/20 hover:shadow-elegant"}`} onClick={() => setSelectedLocation(location.id)}>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <img src={location.image} alt={location.name} className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-playfair text-sm md:text-base font-bold ${selectedLocation === location.id ? "text-primary-foreground" : "text-foreground"}`}>
                            {location.name.split(" - ")[1]}
                          </h4>
                          <Badge className={`text-xs ${selectedLocation === location.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/20 text-primary"}`}>
                            {location.specialty}
                          </Badge>
                        </div>
                        <p className={`text-xs md:text-sm mb-2 ${selectedLocation === location.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {location.address}
                        </p>
                        <div className={`flex items-center text-xs md:text-sm ${selectedLocation === location.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {location.hours}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 md:mt-8 space-y-3">
              <Button 
                className="w-full text-sm md:text-base bg-gradient-accent text-primary-foreground hover:shadow-glow"
                onClick={findNearestBranch}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Tìm chi nhánh gần nhất
              </Button>
              <Button variant="outline" className="w-full text-sm md:text-base hover:shadow-elegant">
                <Phone className="w-4 h-4 mr-2" />
                Gọi đặt bàn: {currentLocation?.phone}
              </Button>
            </div>
          </div>

          {/* Location Details */}
          <div className="lg:col-span-2">
            {currentLocation && <div>
                {/* Location Image & Info */}
                <Card className="bg-card/70 border-primary/20 mb-6 md:mb-8">
                  <div className="relative">
                    <img src={currentLocation.image} alt={currentLocation.name} className="w-full h-48 md:h-64 object-cover rounded-t-lg" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-accent text-primary-foreground">
                        {currentLocation.specialty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Button size="sm" className="bg-background/80 text-foreground hover:bg-background">
                        <Music className="w-4 h-4 mr-2" />
                        {currentLocation.playlist}
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                      {currentLocation.name}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <div className="flex items-center text-foreground mb-2 md:mb-3">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-primary" />
                          <span className="font-inter text-sm md:text-base">{currentLocation.address}</span>
                        </div>
                        <div className="flex items-center text-foreground mb-2 md:mb-3">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-primary" />
                          <span className="font-inter text-sm md:text-base">{currentLocation.hours}</span>
                        </div>
                        <div className="flex items-center text-foreground mb-2 md:mb-3">
                          <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-primary" />
                          <span className="font-inter text-sm md:text-base">{currentLocation.phone}</span>
                        </div>
                        <div className="flex items-center text-foreground mb-2 md:mb-3">
                          <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-primary" />
                          <span className="font-inter font-semibold text-sm md:text-base">{currentLocation.rating}/5.0</span>
                          <span className="text-muted-foreground text-xs md:text-sm ml-2">({currentLocation.monthlyVisitors} khách/tháng)</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-inter text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                          {currentLocation.description}
                        </p>
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                          {currentLocation.features.map((feature, idx) => <Badge key={idx} variant="outline" className="text-xs md:text-sm text-primary border-primary/30">
                              {feature}
                            </Badge>)}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          <p className="mb-1 md:mb-2"><strong>Mood:</strong> {currentLocation.mood}</p>
                          <p><strong>Thời gian lý tưởng:</strong> {currentLocation.bestTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Signature Drinks & Statistics */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h5 className="font-playfair text-sm md:text-base font-bold text-foreground mb-2 md:mb-3 flex items-center">
                          <Coffee className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                          Signature Drinks
                        </h5>
                        <div className="space-y-1 md:space-y-2">
                          {currentLocation.signatureDrinks.map((drink, idx) => <div key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-2 md:mr-3"></div>
                              <span className="font-inter text-sm md:text-base text-foreground">{drink}</span>
                            </div>)}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-playfair text-sm md:text-base font-bold text-foreground mb-2 md:mb-3 flex items-center">
                          <Headphones className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                          Thống kê tháng này
                        </h5>
                        <div className="space-y-1 md:space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs md:text-sm text-muted-foreground">Bản nhạc đã tạo:</span>
                            <span className="font-semibold text-sm md:text-base text-foreground">{currentLocation.songsCreated}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs md:text-sm text-muted-foreground">Lượt ghé thăm:</span>
                            <span className="font-semibold text-sm md:text-base text-foreground">{currentLocation.monthlyVisitors}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Offer */}
                    <Card className="bg-gradient-accent/10 border-primary/30 mb-4 md:mb-6">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center">
                          <Gift className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-primary" />
                          <div>
                            <h6 className="font-playfair text-sm md:text-base font-bold text-foreground mb-1">Ưu đãi đặc biệt</h6>
                            <p className="text-xs md:text-sm text-muted-foreground">{currentLocation.specialOffer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                      <Button 
                        className="text-xs md:text-sm bg-gradient-accent text-primary-foreground hover:shadow-glow"
                        onClick={() => setIsQuickBookingModalOpen(true)}
                      >
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Đặt bàn ngay
                      </Button>
                      <Button variant="outline" className="text-xs md:text-sm hover:shadow-elegant">
                        <Music className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Nghe playlist
                      </Button>
                      <Button variant="outline" className="text-xs md:text-sm hover:shadow-elegant">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Demo AI Music
                      </Button>
                      <Button variant="outline" className="text-xs md:text-sm hover:shadow-elegant" onClick={() => window.open(currentLocation.branchUrl, '_blank')}>
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Thông tin chi nhánh
                      </Button>
                      <Button variant="outline" className="text-xs md:text-sm hover:shadow-elegant" onClick={() => window.open(currentLocation.facebookUrl, '_blank')}>
                        <Facebook className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Facebook
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Map Placeholder */}
                <Card className="bg-card/70 border-primary/20 mb-6 md:mb-8">
                  <CardContent className="p-4 md:p-6">
                    <h4 className="font-playfair text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                      Vị trí trên bản đồ
                    </h4>
                    <div className="w-full h-48 md:h-64 bg-gradient-hero rounded-lg flex items-center justify-center relative overflow-hidden" style={{
                  backgroundImage: 'linear-gradient(45deg, #703C3C 25%, transparent 25%), linear-gradient(-45deg, #703C3C 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #703C3C 75%), linear-gradient(-45deg, transparent 75%, #703C3C 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}>
                      <div className="text-center text-foreground px-4">
                        <MapPin className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
                        <p className="font-inter text-sm md:text-base font-semibold mb-2">
                          {currentLocation.name}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                          Lat: {currentLocation.coordinates.lat}, Lng: {currentLocation.coordinates.lng}
                        </p>
                        <Button className="text-xs md:text-sm bg-gradient-accent text-primary-foreground hover:shadow-glow">
                          <Navigation className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Chỉ đường Google Maps
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Services & Amenities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <Card className="bg-card/70 border-primary/20 text-center">
                    <CardContent className="p-4 md:p-6">
                      <Wifi className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                      <h5 className="font-playfair text-sm md:text-base font-bold text-foreground mb-1 md:mb-2">Free WiFi</h5>
                      <p className="text-xs md:text-sm text-muted-foreground">Tốc độ cao, ổn định</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/70 border-primary/20 text-center">
                    <CardContent className="p-4 md:p-6">
                      <Car className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                      <h5 className="font-playfair text-sm md:text-base font-bold text-foreground mb-1 md:mb-2">Parking</h5>
                      <p className="text-xs md:text-sm text-muted-foreground">Bãi đậu xe miễn phí</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/70 border-primary/20 text-center">
                    <CardContent className="p-4 md:p-6">
                      <Music className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                      <h5 className="font-playfair text-sm md:text-base font-bold text-foreground mb-1 md:mb-2">AI Music</h5>
                      <p className="text-xs md:text-sm text-muted-foreground">Tạo nhạc cá nhân</p>
                    </CardContent>
                  </Card>
                </div>
              </div>}
          </div>
        </div>
      </div>
      
      <QuickBookingModal 
        isOpen={isQuickBookingModalOpen} 
        onClose={() => setIsQuickBookingModalOpen(false)} 
      />
    </section>;
};
export default LocationsSection;