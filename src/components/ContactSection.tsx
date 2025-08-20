import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle, Clock, Star } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Hotline",
      content: "1900 8888 RAN",
      subtitle: "Phản hồi trong 24h"
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@ransignature.vn",
      subtitle: "Hỗ trợ khách hàng"
    },
    {
      icon: MessageCircle,
      title: "Zalo OA",
      content: "RAN Signature Official",
      subtitle: "Chat trực tiếp"
    },
    {
      icon: Clock,
      title: "Giờ hỗ trợ",
      content: "07:00 - 22:00",
      subtitle: "Tất cả các ngày"
    }
  ];

  const subjects = [
    { value: "general", label: "Thông tin chung" },
    { value: "booking", label: "Đặt bàn" },
    { value: "feedback", label: "Góp ý / Phản hồi" },
    { value: "franchise", label: "Nhượng quyền" },
    { value: "partnership", label: "Hợp tác" },
    { value: "technical", label: "Hỗ trợ kỹ thuật" }
  ];

  const testimonials = [
    {
      name: "Minh Anh",
      rating: 5,
      comment: "Trải nghiệm tuyệt vời! Đồ uống ngon và tính năng tạo nhạc AI thật độc đáo.",
      branch: "RAN Ngô Quyền"
    },
    {
      name: "Hoàng Việt",
      rating: 5,
      comment: "Không gian đẹp, nhân viên thân thiện. Sẽ quay lại nhiều lần nữa!",
      branch: "RAN Hà Nội"
    },
    {
      name: "Thu Hương",
      rating: 5,
      comment: "Coffee signature ngon nhất từng thử. QR tạo nhạc rất thú vị.",
      branch: "RAN Đà Nẵng"
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Liên hệ với <span className="text-primary">RAN</span>
          </h2>
          <p className="font-inter text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;