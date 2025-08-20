
import Navigation from "@/components/Navigation";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const Events = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              Sự Kiện <span className="text-primary">Nghệ Thuật</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              "Nơi âm nhạc gặp gỡ vị giác, nơi cảm xúc được thăng hoa."
            </p>
          </div>
        </div>
      </section>
      
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Events;
