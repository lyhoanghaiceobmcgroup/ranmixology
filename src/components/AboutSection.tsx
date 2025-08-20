import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Music, Palette, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const values = [
    {
      icon: Music,
      title: "Rhythm",
      description: "Nhịp điệu âm nhạc hòa quyện trong từng ngụm thưởng thức"
    },
    {
      icon: Palette,
      title: "Artisan",
      description: "Nghệ thuật pha chế từ tay những barista tài hoa"
    },
    {
      icon: Brain,
      title: "Novelty",
      description: "Công nghệ AI tạo ra trải nghiệm hoàn toàn mới lạ"
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Về thương hiệu <span className="text-primary">RAN</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Không gian hòa quyện giữa sáng tạo và công nghệ, nơi mỗi ly đồ uống kể một câu chuyện riêng biệt
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-20">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
              Triết lý RAN: Rhythm • Artisan • Novelty
            </h3>
            <p className="font-inter text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Ra đời từ sự giao thoa giữa nghệ sĩ pha chế và nhà sáng lập AI, RAN Signature không chỉ 
              là nơi thưởng thức đồ uống mà còn là trải nghiệm nghệ thuật đa giác quan độc đáo.
            </p>
            <p className="font-inter text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Mỗi khách hàng đến RAN đều có thể tạo ra bản nhạc riêng thông qua công nghệ AI, 
              biến hóa cảm xúc thành giai điệu và lưu giữ khoảnh khắc đặc biệt.
            </p>
            <Link to="/about">
              <Button className="bg-gradient-accent text-primary-foreground hover:shadow-glow w-full sm:w-auto">
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Tìm hiểu đội ngũ
              </Button>
            </Link>
          </div>

          {/* Right - Values Grid */}
          <div className="grid gap-4 md:gap-6 order-1 lg:order-2">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">
                        {value.title}
                      </h4>
                      <p className="font-inter text-muted-foreground text-sm md:text-base">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-card/30 rounded-2xl p-6 md:p-8 lg:p-12 border border-primary/20">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              Công nghệ độc quyền
            </h3>
            <p className="font-inter text-muted-foreground text-sm md:text-base">
              QR bill → tạo nhạc AI → token hóa → bán bản quyền Bynefits
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-lg md:text-2xl font-playfair font-bold text-primary-foreground">1</span>
              </div>
              <h4 className="font-inter font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Quét QR</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Sau khi thanh toán</p>
            </div>
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-lg md:text-2xl font-playfair font-bold text-primary-foreground">2</span>
              </div>
              <h4 className="font-inter font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Tạo nhạc AI</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Dựa trên tâm trạng</p>
            </div>
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-lg md:text-2xl font-playfair font-bold text-primary-foreground">3</span>
              </div>
              <h4 className="font-inter font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Token hóa</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Lưu trữ blockchain</p>
            </div>
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-lg md:text-2xl font-playfair font-bold text-primary-foreground">4</span>
              </div>
              <h4 className="font-inter font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Bán bản quyền</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Qua Bynefits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;