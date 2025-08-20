
import { Coffee, Music, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center mr-3">
                <Coffee className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground">RAN MIXOLOGY</h3>
            </div>
            <p className="font-inter text-muted-foreground mb-3 md:mb-4">
              Trạm dừng vị giác - Bitro - Coffee - Tea
            </p>
            <p className="font-inter text-sm text-muted-foreground">
              "Mỗi ly là một bản nhạc, mỗi vị là một trạng thái cảm xúc."
            </p>
          </div>

          {/* Chi nhánh */}
          <div>
            <h4 className="font-playfair font-semibold text-foreground mb-3 md:mb-4">Chi nhánh</h4>
            <ul className="space-y-2 md:space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">RAN Coffee - Tea</p>
                  <p className="text-xs md:text-sm">40 Ngô Quyền, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">RAN Bitro</p>
                  <p className="text-xs md:text-sm">35 Nguyễn Bỉnh Khiêm, Hà Nội</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="font-playfair font-semibold text-foreground mb-3 md:mb-4">Dịch vụ</h4>
            <ul className="space-y-1.5 md:space-y-2 text-muted-foreground text-sm md:text-base">
              <li className="flex items-center">
                <Coffee className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>Mixology & Coffee</span>
              </li>
              <li className="flex items-center">
                <Music className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>AI Music Generation</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center text-primary">•</span>
                <span>Event Space</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center text-primary">•</span>
                <span>Franchise Program</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center text-primary">•</span>
                <span>Tea Ceremony</span>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center text-primary">•</span>
                <span>Barista Training</span>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="font-playfair font-semibold text-foreground mb-3 md:mb-4">Liên hệ</h4>
            <ul className="space-y-2 md:space-y-3 text-muted-foreground text-sm md:text-base">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <a href="tel:0569810000" className="hover:text-primary transition-colors">
                  056 981 0000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <a href="mailto:RanMixology@gmail.com" className="hover:text-primary transition-colors break-all">
                  RanMixology@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Facebook className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <a href="#" className="hover:text-primary transition-colors">
                  RAN Mixology
                </a>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-4 md:mt-6">
              <h5 className="font-inter font-medium text-foreground mb-2 md:mb-3 text-sm md:text-base">Theo dõi RAN</h5>
              <div className="flex space-x-2 md:space-x-3">
                <a href="#" className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
              © 2025 RAN Signature. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-primary transition-colors">Hợp tác</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
