import { Button } from "@/components/ui/button";
import { Play, QrCode, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-interior.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-playfair text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Trạm dừng <span className="text-primary">vị giác</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-inter text-base md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Mixology | Artisan Coffee & Tea | Cá nhân hóa bằng AI
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-card/80 rounded-full text-foreground font-inter text-xs md:text-sm border border-primary/20">
              100% Không cồn
            </span>
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-card/80 rounded-full text-foreground font-inter text-xs md:text-sm border border-primary/20">
              Signature Mixology
            </span>
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-card/80 rounded-full text-foreground font-inter text-xs md:text-sm border border-primary/20">
              QR âm nhạc độc quyền
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16">
            <Link to="/menu">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-accent text-primary-foreground hover:shadow-glow font-inter font-semibold text-sm md:text-base">
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Khám phá menu
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto hover:shadow-glow font-inter font-semibold text-sm md:text-base">
              <QrCode className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Scan thử QR Demo
            </Button>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-primary mb-1 md:mb-2">
                120,338
              </div>
              <div className="text-muted-foreground font-inter text-xs md:text-sm">
                Bản nhạc đã tạo
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-primary mb-1 md:mb-2">
                6,938
              </div>
              <div className="text-muted-foreground font-inter text-xs md:text-sm">
                Khách quay lại tháng này
              </div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-primary mb-1 md:mb-2">
                85%
              </div>
              <div className="text-muted-foreground font-inter text-xs md:text-sm">
                Khách hài lòng
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;