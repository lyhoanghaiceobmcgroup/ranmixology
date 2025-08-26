import { useState, useEffect } from "react";
import { Menu, X, Music, MapPin, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import MusicPaymentModal from "./MusicPaymentModal";
import QuickBookingModal from "./QuickBookingModal";
import CartModal from "./CartModal";
import { cartService } from "@/services/cartService";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isQuickBookingModalOpen, setIsQuickBookingModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const state = cartService.getCart();
      const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemsCount(totalItems);
    };

    updateCartCount();
    const unsubscribe = cartService.subscribe(updateCartCount);
    return unsubscribe;
  }, []);

  const menuItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Về RAN", href: "/about" },
    { name: "Thực đơn", href: "/menu" },
    { name: "Sự kiện", href: "/events" },
    { name: "Chi nhánh", href: "/locations" },
    { name: "Nhượng quyền", href: "/franchise" },
    { name: "Liên hệ", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href || (href.includes("#") && location.pathname === "/" && href.startsWith("/#"));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <img src="/src/assets/logo.svg" alt="RAN Logo" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-foreground">RAN</h1>
              <p className="text-xs text-muted-foreground">SIGNATURE</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors duration-200 font-inter ${
                  isActive(item.href) ? "text-primary font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:shadow-glow"
              onClick={() => setIsQuickBookingModalOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Đặt bàn
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:shadow-glow relative"
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Giỏ hàng
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-accent text-primary-foreground hover:shadow-glow"
              onClick={() => setIsMusicModalOpen(true)}
            >
              <Music className="w-4 h-4 mr-2" />
              Tạo nhạc AI
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200 ${
                    isActive(item.href) ? "text-primary font-semibold bg-muted" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsQuickBookingModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Đặt bàn
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full relative"
                  onClick={() => {
                    setIsCartModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Giỏ hàng
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
                <Button 
                  variant="default" 
                  className="w-full bg-gradient-accent"
                  onClick={() => setIsMusicModalOpen(true)}
                >
                  <Music className="w-4 h-4 mr-2" />
                  Tạo nhạc AI
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <MusicPaymentModal 
        isOpen={isMusicModalOpen} 
        onClose={() => setIsMusicModalOpen(false)} 
      />
      <QuickBookingModal 
        isOpen={isQuickBookingModalOpen} 
        onClose={() => setIsQuickBookingModalOpen(false)} 
      />
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;
