
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import Franchise from "./pages/Franchise";
import Contact from "./pages/Contact";
import Playlist from "./pages/Playlist";
import AIMusicDemo from "./pages/AIMusicDemo";
import BranchInfo from "./pages/BranchInfo";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/events" element={<Events />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/ai-music-demo" element={<AIMusicDemo />} />
          <Route path="/branch-info" element={<BranchInfo />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
