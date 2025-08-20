import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Leaf, Sparkles, Brain, Heart, Zap, Moon, MapPin, Music2, Camera, Star } from "lucide-react";
import drinksImage from "@/assets/drinks-collection.jpg";
import MusicGenerationModal from "./MusicGenerationModal";
const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("tea");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<{
    name: string;
    mood: string[];
  } | null>(null);
  const categories = [{
    id: "tea",
    name: "Trà thủ công",
    icon: Leaf
  }, {
    id: "coffee",
    name: "Cà phê signature",
    icon: Coffee
  }, {
    id: "mocktail",
    name: "Mocktail nghệ thuật",
    icon: Sparkles
  }, {
    id: "sets",
    name: "Set trải nghiệm",
    icon: Star
  }];
  const moods = [{
    id: "chill",
    name: "Chill",
    icon: Moon,
    color: "bg-blue-500/20 text-blue-400"
  }, {
    id: "energetic",
    name: "Năng lượng",
    icon: Zap,
    color: "bg-yellow-500/20 text-yellow-400"
  }, {
    id: "romantic",
    name: "Dịu dàng",
    icon: Heart,
    color: "bg-pink-500/20 text-pink-400"
  }, {
    id: "focus",
    name: "Tập trung",
    icon: Brain,
    color: "bg-purple-500/20 text-purple-400"
  }, {
    id: "artistic",
    name: "Nghệ thuật",
    icon: Sparkles,
    color: "bg-gradient-accent text-primary-foreground"
  }];
  const branches = [{
    id: "all",
    name: "Tất cả chi nhánh"
  }, {
    id: "hanoi",
    name: "Hà Nội"
  }, {
    id: "hcm",
    name: "TP.HCM"
  }, {
    id: "danang",
    name: "Đà Nẵng"
  }, {
    id: "hoian",
    name: "Hội An"
  }, {
    id: "dalat",
    name: "Đà Lạt"
  }];
  const menuItems = {
    tea: [{
      name: "Trà Hồng Kỳ Tinh",
      description: "Ô long hoa hồng – thanh dịu, hương thơm quyến rũ",
      price: "65,000đ",
      mood: ["romantic", "chill"],
      branch: ["all"],
      specialty: "Signature",
      image: drinksImage,
      ingredients: ["Ô long cao cấp", "Hoa hồng Đà Lạt", "Mật ong hoa"]
    }, {
      name: "Trà Đen Cam Thảo",
      description: "Vị mạnh, hậu ngọt, tăng cường tập trung",
      price: "55,000đ",
      mood: ["focus", "energetic"],
      branch: ["hanoi"],
      specialty: "Chi nhánh Hà Nội",
      image: drinksImage,
      ingredients: ["Trà đen Ceylon", "Cam thảo", "Gừng tươi"]
    }, {
      name: "Sen Tuyết Mộc",
      description: "Trà sen tươi kết hợp tuyết mộc, thanh tao",
      price: "75,000đ",
      mood: ["chill", "romantic"],
      branch: ["danang"],
      specialty: "Đặc sản Đà Nẵng",
      image: drinksImage,
      ingredients: ["Lá sen tươi", "Tuyết mộc", "Đường phèn"]
    }, {
      name: "Jasmine Bliss",
      description: "Hoa nhài và táo xanh, tươi mát dễ chịu",
      price: "58,000đ",
      mood: ["chill", "energetic"],
      branch: ["all"],
      specialty: "Bestseller",
      image: drinksImage,
      ingredients: ["Trà hoa nhài", "Táo xanh", "Lá bạc hà"]
    }, {
      name: "Green Harmony",
      description: "Matcha Nhật Bản với húng bạc hà tươi",
      price: "68,000đ",
      mood: ["energetic", "focus"],
      branch: ["hcm"],
      specialty: "TP.HCM exclusive",
      image: drinksImage,
      ingredients: ["Matcha Uji", "Húng bạc hà", "Sữa yến mạch"]
    }],
    coffee: [{
      name: "RAN Cold Brew",
      description: "Cold brew lên men tự nhiên 24h, đậm đà tinh tế",
      price: "89,000đ",
      mood: ["chill", "focus"],
      branch: ["all"],
      specialty: "RAN Signature",
      image: drinksImage,
      ingredients: ["Arabica Ethiopia", "Robusta Đắk Lắk", "Thời gian lên men 24h"]
    }, {
      name: "Espresso Gỗ Tùng",
      description: "Hậu vị tùng độc đáo, hạt cacao đen Việt Nam",
      price: "95,000đ",
      mood: ["focus", "artistic"],
      branch: ["hanoi"],
      specialty: "Hà Nội signature",
      image: drinksImage,
      ingredients: ["Espresso blend", "Tinh dầu gỗ tùng", "Cacao đen"]
    }, {
      name: "Latte Tinh Vân",
      description: "Latte với foam nghệ thuật và tinh dầu thảo mộc",
      price: "85,000đ",
      mood: ["artistic", "romantic"],
      branch: ["hcm"],
      specialty: "Nghệ thuật foam",
      image: drinksImage,
      ingredients: ["Espresso blend", "Sữa tươi", "Tinh dầu lavender"]
    }, {
      name: "Trứng Nâu Vintage",
      description: "Cà phê trứng kiểu Hà Nội truyền thống",
      price: "78,000đ",
      mood: ["chill", "romantic"],
      branch: ["hanoi"],
      specialty: "Truyền thống Hà Nội",
      image: drinksImage,
      ingredients: ["Cà phê phin", "Trứng gà", "Sữa đặc"]
    }, {
      name: "Phin Tĩnh Tâm",
      description: "Pha tại bàn – trải nghiệm thiền và thưởng thức",
      price: "92,000đ",
      mood: ["chill", "focus"],
      branch: ["hoian"],
      specialty: "Ritual experience",
      image: drinksImage,
      ingredients: ["Robusta Cầu Đất", "Phin đồng", "Nghi thức pha chế"]
    }],
    mocktail: [{
      name: "Mộng Thanh",
      description: "Việt quất – hồng trà – thảo mộc, cảm giác mơ màng",
      price: "120,000đ",
      mood: ["chill", "romantic"],
      branch: ["dalat"],
      specialty: "Đà Lạt exclusive",
      image: drinksImage,
      ingredients: ["Việt quất tươi", "Hồng trà", "Thảo mộc rừng"]
    }, {
      name: "Fireless Night",
      description: "Gừng – quế – dâu với đá viên khói, mạnh mẽ táo bạo",
      price: "135,000đ",
      mood: ["energetic", "artistic"],
      branch: ["hcm"],
      specialty: "Khói khô đặc biệt",
      image: drinksImage,
      ingredients: ["Gừng tươi", "Quế", "Dâu tây", "Đá khói"]
    }, {
      name: "Silence Sunset",
      description: "Cam – lavender – tonic, nhẹ nhàng như hoàng hôn",
      price: "115,000đ",
      mood: ["chill", "romantic"],
      branch: ["hoian"],
      specialty: "Sunset special",
      image: drinksImage,
      ingredients: ["Cam tươi", "Lavender", "Tonic water"]
    }, {
      name: "Flow In Bloom",
      description: "Hoa hồng – táo – lá bạc hà, tươi mát sảng khoái",
      price: "125,000đ",
      mood: ["energetic", "romantic"],
      branch: ["hanoi"],
      specialty: "Flower series",
      image: drinksImage,
      ingredients: ["Hoa hồng", "Táo xanh", "Bạc hà tươi"]
    }, {
      name: "Night Over Canvas",
      description: "Than hoạt tính với thảo mộc đắng, sâu lắng",
      price: "145,000đ",
      mood: ["artistic", "focus"],
      branch: ["hanoi", "hcm"],
      specialty: "Deep soul experience",
      image: drinksImage,
      ingredients: ["Than hoạt tính", "Thảo mộc đắng", "Siro đen"]
    }],
    sets: [{
      name: "RAN Sound Trio",
      description: "3 ly nhỏ ứng với 'Dẫn – Điểm – Kết' trong bản nhạc AI",
      price: "350,000đ",
      mood: ["artistic", "focus"],
      branch: ["hanoi"],
      specialty: "Flagship experience",
      image: drinksImage,
      ingredients: ["Tea opening", "Coffee climax", "Mocktail finale"]
    }, {
      name: "Chill Garden Set",
      description: "Trà lạnh – mix nhẹ – bánh tươi trong không gian sân vườn",
      price: "280,000đ",
      mood: ["chill", "romantic"],
      branch: ["all"],
      specialty: "Garden space",
      image: drinksImage,
      ingredients: ["Trà thảo mộc", "Mocktail nhẹ", "Bánh tươi"]
    }, {
      name: "Muse Series",
      description: "Set mocktail theo cảm hứng nghệ sĩ nổi tiếng",
      price: "420,000đ",
      mood: ["artistic", "energetic"],
      branch: ["hcm", "danang"],
      specialty: "Artist inspiration",
      image: drinksImage,
      ingredients: ["3 mocktail nghệ thuật", "Story card", "Playlist cá nhân"]
    }]
  };
  const filteredItems = () => {
    let items = menuItems[activeCategory];
    if (selectedMood) {
      items = items.filter(item => item.mood.includes(selectedMood));
    }
    if (selectedBranch && selectedBranch !== "all") {
      items = items.filter(item => item.branch.includes(selectedBranch) || item.branch.includes("all"));
    }
    return items;
  };
  const openMusicModal = (drinkName: string, mood: string[]) => {
    setSelectedDrink({
      name: drinkName,
      mood
    });
    setMusicModalOpen(true);
  };
  return <section id="menu" className="py-12 md:py-20 bg-card/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Menu <span className="text-primary">Signature</span>
          </h2>
          <p className="font-inter text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá thế giới hương vị độc đáo với menu được cá nhân hóa bằng AI
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="font-inter font-semibold text-xs md:text-sm px-3 py-2 md:px-4 md:py-2"
              >
                <IconComponent className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Mood & Branch Filters */}
        <div className="flex flex-col gap-4 justify-center mb-8 md:mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground mr-2">Mood:</span>
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedMood(selectedMood === mood.id ? "" : mood.id)}
                  className={`font-inter text-xs px-2 py-1 ${mood.color}`}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {mood.name}
                </Button>
              );
            })}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground mr-2">Chi nhánh:</span>
            {branches.map((branch) => (
              <Button
                key={branch.id}
                variant={selectedBranch === branch.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedBranch(selectedBranch === branch.id ? "" : branch.id)}
                className="font-inter text-xs px-2 py-1"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {branch.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems().map((item, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.specialty && (
                  <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-gradient-accent text-primary-foreground text-xs">
                    {item.specialty}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 md:top-4 md:right-4 bg-background/80 hover:bg-background w-8 h-8 md:w-10 md:h-10"
                  onClick={() => openMusicModal(item.name, item.mood)}
                >
                  <Music2 className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
              
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <h3 className="font-playfair text-lg md:text-xl font-bold text-foreground">{item.name}</h3>
                  <span className="font-inter text-base md:text-lg font-bold text-primary">{item.price}</span>
                </div>
                
                <p className="font-inter text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {item.mood.map((moodId) => {
                    const moodObj = moods.find(m => m.id === moodId);
                    return moodObj ? (
                      <Badge key={moodId} variant="secondary" className="text-xs">
                        {moodObj.name}
                      </Badge>
                    ) : null;
                  })}
                  {item.branch.map((branchId) => {
                    const branchObj = branches.find(b => b.id === branchId);
                    return branchObj ? (
                      <Badge key={branchId} variant="outline" className="text-xs">
                        {branchObj.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
                
                {item.ingredients && (
                  <div className="mb-3 md:mb-4">
                    <p className="font-inter text-xs text-muted-foreground mb-1 md:mb-2">Thành phần:</p>
                    <p className="font-inter text-xs text-foreground">{item.ingredients.join(", ")}</p>
                  </div>
                )}
                
                <Button className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow font-inter font-semibold text-sm">
                  <Camera className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Menu Items Grid - removed */}

        {/* AR Experience CTA - removed */}

        {/* Music Generation Modal */}
        {selectedDrink && <MusicGenerationModal isOpen={musicModalOpen} onClose={() => setMusicModalOpen(false)} drinkName={selectedDrink.name} mood={selectedDrink.mood} />}
      </div>
    </section>;
};
export default MenuSection;