import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  CreditCard, 
  Music, 
  Music2,
  Download, 
  Play, 
  Pause, 
  CheckCircle, 
  Loader2,
  Send,
  MessageSquare,
  Camera,
  Upload
} from "lucide-react";
import { telegramService, PaymentInfo } from "@/services/telegramService";
import { sunoService, MusicGenerationRequest, MusicGenerationResponse } from "@/services/sunoService";

interface MusicPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentStep = 'payment' | 'verification' | 'prompt' | 'generating' | 'completed';

const MusicPaymentModal = ({ isOpen, onClose }: MusicPaymentModalProps) => {
  const [currentStep, setCurrentStep] = useState<'payment' | 'verification' | 'prompt' | 'generating' | 'completed'>('payment');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [musicTitle, setMusicTitle] = useState<string>("");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [generatedMusic, setGeneratedMusic] = useState<MusicGenerationResponse | null>(null);
  const [paymentInfo, setPaymentInfo] = useState({
    amount: "50,000",
    currency: "VNĐ",
    method: "Chuyển khoản ngân hàng",
    accountNumber: "1234567890",
    accountName: "RAN MIXOLOGY",
    bankName: "Vietcombank"
  });
  const [billImage, setBillImage] = useState<File | null>(null);
  const [billPreview, setBillPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Timer countdown effect
  useEffect(() => {
    if (currentStep === 'verification' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === 'verification' && timeLeft === 0) {
      setCurrentStep('payment');
      toast({
        title: "Hết thời gian",
        description: "Vui lòng thực hiện lại thanh toán",
        variant: "destructive",
      });
    }
  }, [currentStep, timeLeft, toast]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File quá lớn",
          description: "Vui lòng chọn ảnh có kích thước nhỏ hơn 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setBillImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBillPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send payment info to Telegram
  const sendPaymentToTelegram = async () => {
    if (!billImage) {
      toast({
        title: "Thiếu hình ảnh bill",
        description: "Vui lòng chụp và tải lên hình ảnh bill thanh toán.",
        variant: "destructive",
      });
      return;
    }

    const payment: PaymentInfo = {
      customerName: paymentInfo.accountName,
      email: "customer@example.com",
      phone: "0123456789",
      amount: 50000, // 50,000 VNĐ
      paymentMethod: paymentInfo.method,
      timestamp: new Date().toLocaleString('vi-VN'),
    };

    const success = await telegramService.sendPaymentVerification(payment, billImage);
    
    if (success) {
      setCurrentStep('verification');
      toast({
        title: "Đã gửi yêu cầu",
        description: "Bill thanh toán đã được gửi để xác thực. Vui lòng chờ trong 5 phút.",
      });
      
      // Simulate approval process
      setTimeout(async () => {
        const approved = await telegramService.simulateApproval();
        if (approved) {
          setCurrentStep('prompt');
          toast({
            title: "Thanh toán đã được duyệt!",
            description: "Bạn có thể bắt đầu tạo nhạc AI ngay bây giờ.",
          });
        } else {
          toast({
            title: "Thanh toán bị từ chối",
            description: "Vui lòng kiểm tra lại thông tin thanh toán.",
            variant: "destructive",
          });
          setCurrentStep('payment');
        }
      }, 10000); // 10 seconds for demo
    } else {
      toast({
        title: "Lỗi gửi yêu cầu",
        description: "Không thể gửi yêu cầu đến Telegram. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  // Simulate Telegram approval (in real app, this would be triggered by webhook)
  const simulateApproval = () => {
    setCurrentStep('prompt');
    toast({
      title: "Thanh toán đã được xác nhận",
      description: "Bạn có thể bắt đầu tạo nhạc ngay bây giờ!",
      variant: "default",
    });
  };

  // Generate music using Suno API
  const generateMusic = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Vui lòng nhập yêu cầu",
        description: "Hãy mô tả loại nhạc bạn muốn tạo",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStep('generating');
    
    const request: MusicGenerationRequest = {
      prompt: prompt,
      style: 'auto',
      duration: 30,
      instrumental: false,
    };

    try {
      // Start music generation
      const initialResponse = await sunoService.generateMusic(request);
      
      toast({
        title: "Đang tạo nhạc...",
        description: "AI đang xử lý yêu cầu của bạn. Vui lòng chờ trong giây lát.",
      });

      // Simulate completion (in production, you'd poll the status)
      const completedMusic = await sunoService.simulateCompletion(initialResponse.id, prompt);
      
      setGeneratedMusic(completedMusic);
      setMusicUrl(completedMusic.url);
      setMusicTitle(completedMusic.title);
      setCurrentStep('completed');
      
      toast({
        title: "Tạo nhạc thành công!",
        description: "Nhạc AI của bạn đã sẵn sàng. Bạn có thể nghe và tải về.",
      });
    } catch (error) {
      console.error('Error generating music:', error);
      toast({
        title: "Lỗi tạo nhạc",
        description: "Không thể tạo nhạc. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setCurrentStep('prompt');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle music playback
  const togglePlayback = () => {
    if (!generatedMusic?.audio_url) return;
    
    if (isPlaying) {
      // Pause music
      setIsPlaying(false);
    } else {
      // Play music
      setIsPlaying(true);
      // In a real app, you'd use an audio element or Web Audio API
    }
  };

  // Handle download with RAN MIXOLOGY branding
  const downloadMusic = () => {
    if (!generatedMusic?.audio_url) return;
    
    const brandedUrl = sunoService.createBrandedDownloadUrl(
      generatedMusic.audio_url, 
      generatedMusic.title || 'Generated Music'
    );
    
    const link = document.createElement('a');
    link.href = brandedUrl;
    link.download = sunoService.generateDownloadFilename(generatedMusic.title || 'Generated Music');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Đang tải xuống",
      description: "Nhạc của bạn đang được tải về với thương hiệu RAN MIXOLOGY",
    });
  };

  // Reset modal state when closing
  const handleClose = () => {
    setCurrentStep('payment');
    setTimeLeft(300);
    setPrompt("");
    setMusicUrl(null);
    setMusicTitle("");
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-playfair text-2xl">
            <Music2 className="w-6 h-6 text-primary" />
            Tạo nhạc AI - RAN Signature
          </DialogTitle>
        </DialogHeader>

        {/* Payment Step */}
        {currentStep === 'payment' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Thông tin thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Số tiền</Label>
                    <div className="text-2xl font-bold text-primary">
                      {paymentInfo.amount} {paymentInfo.currency}
                    </div>
                  </div>
                  <div>
                    <Label>Phương thức</Label>
                    <div className="text-sm text-muted-foreground">
                      {paymentInfo.method}
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Số tài khoản:</span>
                    <span className="font-mono">{paymentInfo.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tên tài khoản:</span>
                    <span className="font-semibold">{paymentInfo.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngân hàng:</span>
                    <span>{paymentInfo.bankName}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Tải lên hình ảnh bill thanh toán</Label>
                    <div className="mt-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Chụp/Chọn ảnh bill
                      </Button>
                    </div>
                    {billPreview && (
                      <div className="mt-2">
                        <img
                          src={billPreview}
                          alt="Bill preview"
                          className="w-full max-w-xs mx-auto rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={sendPaymentToTelegram}
                  disabled={!billImage}
                  className="w-full bg-gradient-accent"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi bill thanh toán
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Verification Step */}
        {currentStep === 'verification' && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-orange-500">
              <Clock className="w-6 h-6" />
              <span className="text-2xl font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Đang chờ xác thực thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Thời gian còn lại để xác thực
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Thông tin đã gửi đến Telegram
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tài khoản:</p>
                      <p className="font-medium">{paymentInfo.accountName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ngân hàng:</p>
                      <p className="font-medium">{paymentInfo.bankName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Số tiền:</p>
                      <p className="font-medium text-green-600">{paymentInfo.amount} {paymentInfo.currency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Thời gian:</p>
                      <p className="font-medium">{new Date().toLocaleString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
                
                {billPreview && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Hình ảnh bill đã gửi:
                    </h4>
                    <img
                      src={billPreview}
                      alt="Bill đã gửi"
                      className="w-full max-w-xs mx-auto rounded-lg border"
                    />
                  </div>
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    Đang chờ admin xác thực thanh toán...
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Hệ thống sẽ tự động cập nhật khi có phản hồi
                  </p>
                </div>
                
                {/* Simulate approval button for demo */}
                <Button 
                  onClick={simulateApproval}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mô phỏng xác nhận (Demo)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Prompt Step */}
        {currentStep === 'prompt' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Thanh toán đã được xác nhận</span>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mô tả bản nhạc bạn muốn tạo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Yêu cầu tạo nhạc</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Ví dụ: Một bản nhạc jazz nhẹ nhàng với âm thanh saxophone, phù hợp với không gian cafe buổi chiều..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button 
                  onClick={generateMusic}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-accent"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang tạo nhạc...
                    </>
                  ) : (
                    <>
                      <Music2 className="w-4 h-4 mr-2" />
                      Tạo nhạc ngay
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Generating Step */}
        {currentStep === 'generating' && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Music2 className="w-16 h-16 text-primary animate-pulse" />
                <Loader2 className="w-8 h-8 absolute -top-2 -right-2 animate-spin text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Đang tạo nhạc cho bạn...</h3>
              <p className="text-muted-foreground">
                AI đang sáng tác bản nhạc độc đáo theo yêu cầu của bạn
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-accent h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Step */}
        {currentStep === 'completed' && musicUrl && (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Bản nhạc đã sẵn sàng!</h3>
              <p className="text-muted-foreground">
                {musicTitle}
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    onClick={togglePlayback}
                    variant="outline"
                    size="lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  
                  <Button
                    onClick={downloadMusic}
                    className="bg-gradient-accent"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <Badge variant="secondary" className="mb-2">
                    <Music2 className="w-3 h-3 mr-1" />
                    RAN MIXOLOGY Signature
                  </Badge>
                  <p>Bản nhạc được tạo bởi AI và mang thương hiệu RAN MIXOLOGY</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MusicPaymentModal;