import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, Ticket, Camera, Search, Filter, Star, Zap, Timer, Music, Coffee, Palette, Heart } from "lucide-react";
import eventMixologyWorkshop from "@/assets/event-mixology-workshop.jpg";
import eventMusicNight from "@/assets/event-music-night.jpg";
import eventTeaCeremony from "@/assets/event-tea-ceremony.jpg";
import eventCoffeeTasting from "@/assets/event-coffee-tasting.jpg";
import eventArtMix from "@/assets/event-art-mix.jpg";
import RegistrationModal from "@/components/RegistrationModal";
import { telegramService } from "@/services/telegramService";
import { eventsService, Event } from "@/services/eventsService";
import { toast } from "sonner";
const EventsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState<{
    type: string;
    title: string;
  } | null>(null);
  
  // Real-time events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventStats, setEventStats] = useState({
    totalEvents: 0,
    totalSeats: 0,
    availableSeats: 0,
    occupancyRate: 0,
    featuredEvents: 0,
    upcomingEvents: 0
  });

  // Quick booking form state
  const [quickBookingData, setQuickBookingData] = useState({
    branch: "",
    date: "",
    time: "",
    guests: "",
    notes: ""
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const handleRegistrationClick = (eventType: string, eventTitle: string) => {
    setSelectedEventForRegistration({ type: eventType, title: eventTitle });
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    setSelectedEventForRegistration(null);
  };

  const handleQuickBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!quickBookingData.branch || !quickBookingData.date || !quickBookingData.time || !quickBookingData.guests) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setIsSubmittingBooking(true);

    try {
      const bookingInfo = {
        type: "Đặt bàn nhanh",
        branch: quickBookingData.branch,
        date: quickBookingData.date,
        time: quickBookingData.time,
        guests: quickBookingData.guests,
        notes: quickBookingData.notes || "Không có ghi chú đặc biệt",
        timestamp: new Date().toLocaleString('vi-VN')
      };

      await telegramService.sendQuickBooking(bookingInfo);
      
      toast.success("Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.");
      
      // Reset form
      setQuickBookingData({
        branch: "",
        date: "",
        time: "",
        guests: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error sending booking:", error);
      toast.error("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại sau.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleQuickBookingChange = (field: string, value: string) => {
    setQuickBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Subscribe to real-time events updates
  useEffect(() => {
    // Initial load
    setEvents(eventsService.getEvents());
    setEventStats(eventsService.getEventStats());

    // Subscribe to real-time updates
    const unsubscribe = eventsService.subscribe((updatedEvents) => {
      setEvents(updatedEvents);
      setEventStats(eventsService.getEventStats());
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Map image imports to event images
  const getEventImage = (imagePath: string) => {
    const imageMap: { [key: string]: string } = {
      '/src/assets/event-mixology-workshop.jpg': eventMixologyWorkshop,
      '/src/assets/event-music-night.jpg': eventMusicNight,
      '/src/assets/event-tea-ceremony.jpg': eventTeaCeremony,
      '/src/assets/event-coffee-tasting.jpg': eventCoffeeTasting,
      '/src/assets/event-art-mix.jpg': eventArtMix
    };
    return imageMap[imagePath] || eventMixologyWorkshop;
  };

  // AI mood recommendations
  const moodRecommendations = [{
    mood: "Chill & Relax",
    events: [1, 3],
    icon: Heart,
    color: "text-blue-400"
  }, {
    mood: "Creative & Inspiring",
    events: [5, 2],
    icon: Palette,
    color: "text-purple-400"
  }, {
    mood: "Learning & Focus",
    events: [4, 3],
    icon: Coffee,
    color: "text-amber-400"
  }, {
    mood: "Social & Fun",
    events: [1, 2],
    icon: Music,
    color: "text-green-400"
  }];

  // Countdown timer for featured event
  useEffect(() => {
    const featuredEvent = events.find(event => event.featured);
    if (featuredEvent) {
      const targetDate = new Date(`${featuredEvent.date}T${featuredEvent.time.split(' - ')[0]}`);
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        setTimeLeft({
          days,
          hours,
          minutes
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  // Filter events
  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedBranch === "all" || selectedBranch === "" || event.branch === selectedBranch) && (selectedType === "all" || selectedType === "" || event.type === selectedType);
  });
  const featuredEvents = events.filter(event => event.featured);
  return <section id="events" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Sự kiện <span className="text-primary">RAN</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Trải nghiệm những workshop độc đáo, đêm nhạc sáng tạo và các hoạt động văn hóa đặc biệt tại RAN
          </p>
          
          {/* Real-time Event Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/20">
              <div className="text-xl md:text-2xl font-bold text-primary">{eventStats.totalEvents}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Sự kiện đang diễn ra</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/20">
              <div className="text-xl md:text-2xl font-bold text-primary">{eventStats.availableSeats}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Chỗ còn trống</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/20">
              <div className="text-xl md:text-2xl font-bold text-primary">{eventStats.occupancyRate}%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Tỷ lệ lấp đầy</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/20">
              <div className="text-xl md:text-2xl font-bold text-primary">{eventStats.featuredEvents}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Sự kiện nổi bật</div>
            </div>
          </div>
        </div>

        {/* Filters Section - removed */}



        {/* Featured Events Spotlight */}
        {featuredEvents.length > 0 && <div className="mb-12 md:mb-16">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 flex items-center justify-center md:justify-start">
              <Star className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-primary" />
              Sự kiện nổi bật tháng này
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredEvents.map(event => <Card key={event.id} className="group bg-gradient-to-br from-card/80 to-card/40 border-primary/30 hover:shadow-elegant transition-all duration-500 overflow-hidden">
                  <div className="relative">
                    <img src={event.image} alt={event.title} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        {event.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {event.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h4 className="font-playfair text-2xl font-bold text-foreground mb-3">
                      {event.title}
                    </h4>
                    
                    {/* Countdown Timer */}
                    <div className="flex items-center justify-center space-x-6 mb-4 p-4 bg-primary/10 rounded-lg">
                      <div className="text-center">
                        <div className="font-playfair text-2xl font-bold text-primary">{timeLeft.days}</div>
                        <div className="text-xs text-muted-foreground">NGÀY</div>
                      </div>
                      <div className="text-center">
                        <div className="font-playfair text-2xl font-bold text-primary">{timeLeft.hours}</div>
                        <div className="text-xs text-muted-foreground">GIỜ</div>
                      </div>
                      <div className="text-center">
                        <div className="font-playfair text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                        <div className="text-xs text-muted-foreground">PHÚT</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </span>
                    </div>

                    <p className="font-inter text-muted-foreground mb-4">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-3xl font-bold text-primary">{event.price}</span>
                      <Button 
                        className="bg-gradient-accent text-primary-foreground hover:shadow-glow"
                        onClick={() => handleRegistrationClick(event.type, event.title)}
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        Đăng ký ngay
                      </Button>
                    </div>

                    {event.offer && <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                        <p className="text-sm text-accent-foreground font-medium">🎁 {event.offer}</p>
                      </div>}
                  </CardContent>
                </Card>)}
            </div>
          </div>}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-primary" />
              Tất cả sự kiện ({filteredEvents.length})
            </h3>
            
            <div className="space-y-6">
              {filteredEvents.map(event => <Card key={event.id} className="group bg-card/70 border-primary/20 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Event Image */}
                      <div className="md:w-48 flex-shrink-0 relative">
                        <img src={getEventImage(event.image)} alt={event.title} className="w-full h-32 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-background/80 text-foreground text-xs">
                            {event.status}
                          </Badge>
                        </div>
                        {event.featured && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-playfair text-xl font-bold text-foreground mb-2">
                              {event.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(event.date).toLocaleDateString('vi-VN')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-accent/20 text-accent-foreground flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {event.rating}
                            </Badge>
                            <Badge className={`${event.type === 'workshop' ? 'bg-blue-500/20 text-blue-400' : event.type === 'music' ? 'bg-purple-500/20 text-purple-400' : event.type === 'mixology' ? 'bg-orange-500/20 text-orange-400' : event.type === 'art' ? 'bg-pink-500/20 text-pink-400' : 'bg-green-500/20 text-green-400'}`}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>

                        <p className="font-inter text-muted-foreground mb-4">
                          {event.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {event.highlights.slice(0, 4).map((highlight, idx) => <div key={idx} className="flex items-center text-sm text-foreground">
                                <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                {highlight}
                              </div>)}
                          </div>
                        </div>

                        {/* Price and Booking */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="font-playfair text-2xl font-bold text-primary">
                              {event.price}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.available}/{event.seats} chỗ trống
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                              Chi tiết
                            </Button>
                            <Button 
                              className="bg-gradient-accent text-primary-foreground hover:shadow-glow"
                              onClick={() => handleRegistrationClick(event.type, event.title)}
                            >
                              <Ticket className="w-4 h-4 mr-2" />
                              Đăng ký
                            </Button>
                          </div>
                        </div>

                        {event.offer && <div className="mt-3 p-2 bg-accent/10 rounded border-l-4 border-accent">
                            <p className="text-sm text-accent-foreground">🎁 {event.offer}</p>
                          </div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Booking Panel & Info */}
          <div>
            {/* Quick Booking */}
            <Card className="bg-card/70 border-primary/20 mb-8">
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-foreground mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Đặt bàn nhanh
                </h3>

                <form onSubmit={handleQuickBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">
                      Chi nhánh <span className="text-red-500">*</span>
                    </label>
                    <Select value={quickBookingData.branch} onValueChange={(value) => handleQuickBookingChange('branch', value)}>
                      <SelectTrigger className="bg-background/50 border-primary/20">
                        <SelectValue placeholder="Chọn chi nhánh" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RAN Signature - 40 Ngô Quyền">RAN Signature - 40 Ngô Quyền</SelectItem>
                        <SelectItem value="RAN Signature - 125 Bà Triệu">RAN Signature - 125 Bà Triệu</SelectItem>
                        <SelectItem value="RAN Signature - 88 Trần Phú">RAN Signature - 88 Trần Phú</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-inter font-medium text-foreground mb-2">
                        Ngày <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="date" 
                        value={quickBookingData.date}
                        onChange={(e) => handleQuickBookingChange('date', e.target.value)}
                        className="bg-background/50 border-primary/20" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-inter font-medium text-foreground mb-2">
                        Giờ <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="time" 
                        value={quickBookingData.time}
                        onChange={(e) => handleQuickBookingChange('time', e.target.value)}
                        className="bg-background/50 border-primary/20" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">
                      Số khách <span className="text-red-500">*</span>
                    </label>
                    <Select value={quickBookingData.guests} onValueChange={(value) => handleQuickBookingChange('guests', value)}>
                      <SelectTrigger className="bg-background/50 border-primary/20">
                        <SelectValue placeholder="Chọn số khách" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 người">2 người</SelectItem>
                        <SelectItem value="4 người">4 người</SelectItem>
                        <SelectItem value="6 người">6 người</SelectItem>
                        <SelectItem value="8+ người">8+ người</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-foreground mb-2">
                      Ghi chú đặc biệt
                    </label>
                    <Input 
                      placeholder="Sinh nhật, kỷ niệm, yên tĩnh..." 
                      value={quickBookingData.notes}
                      onChange={(e) => handleQuickBookingChange('notes', e.target.value)}
                      className="bg-background/50 border-primary/20" 
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {isSubmittingBooking ? 'Đang đặt bàn...' : 'Đặt bàn ngay'}
                  </Button>
                </form>

                {/* AI Suggestion */}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center text-sm text-primary mb-1">
                    <Zap className="w-4 h-4 mr-1" />
                    Gợi ý AI
                  </div>
                  <p className="text-sm text-foreground">
                    Khung giờ 19:30 - 20:00 thường ít ồn nhất, phù hợp để thưởng thức không gian yên tĩnh
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-card/70 border-primary/20 mb-8">
              <CardContent className="p-6">
                <h4 className="font-playfair text-lg font-bold text-foreground mb-4">
                  Thống kê sự kiện
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sự kiện tháng này</span>
                    <span className="font-bold text-primary">12 sự kiện</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Khách tham gia</span>
                    <span className="font-bold text-primary">847 người</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Đánh giá trung bình</span>
                    <span className="font-bold text-primary flex items-center">
                      4.8 <Star className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bản nhạc được tạo</span>
                    <span className="font-bold text-primary">1,234 bài</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Gallery */}
            <Card className="bg-card/70 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-playfair text-lg font-bold text-foreground mb-4 flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Album sự kiện
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[eventMixologyWorkshop, eventMusicNight, eventTeaCeremony, eventCoffeeTasting].map((image, i) => <img key={i} src={image} alt={`Event ${i + 1}`} className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer shadow-sm" />)}
                </div>
                <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/10">
                  Xem thêm ảnh
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        eventType={selectedEventForRegistration?.type || ""}
        eventTitle={selectedEventForRegistration?.title}
      />
    </section>;
};
export default EventsSection;