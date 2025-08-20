import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Wand2, 
  Sparkles, 
  Volume2, 
  Clock, 
  Mic, 
  Settings, 
  RefreshCw,
  Heart,
  Star,
  Headphones,
  Zap,
  Brain,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIMusicDemo = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<any>(null);
  const [formData, setFormData] = useState({
    mood: "relaxing",
    genre: "ambient",
    tempo: [120],
    duration: [180],
    description: "",
    customerName: ""
  });

  const moods = [
    { value: "relaxing", label: "Thư giãn", color: "bg-blue-500" },
    { value: "energetic", label: "Năng động", color: "bg-red-500" },
    { value: "romantic", label: "Lãng mạn", color: "bg-pink-500" },
    { value: "focused", label: "Tập trung", color: "bg-green-500" },
    { value: "happy", label: "Vui vẻ", color: "bg-yellow-500" },
    { value: "mysterious", label: "Bí ẩn", color: "bg-purple-500" }
  ];

  const genres = [
    { value: "ambient", label: "Ambient" },
    { value: "jazz", label: "Jazz" },
    { value: "electronic", label: "Electronic" },
    { value: "classical", label: "Classical" },
    { value: "lofi", label: "Lo-fi" },
    { value: "chillhop", label: "Chillhop" },
    { value: "neosoul", label: "Neo Soul" },
    { value: "synthwave", label: "Synthwave" }
  ];

  const sampleTracks = [
    {
      id: 1,
      title: "Morning Serenity",
      mood: "relaxing",
      genre: "ambient",
      duration: "3:45",
      creator: "Khách hàng Minh A.",
      plays: 1247,
      likes: 89
    },
    {
      id: 2,
      title: "Urban Energy",
      mood: "energetic",
      genre: "electronic",
      duration: "4:12",
      creator: "Khách hàng Thu H.",
      plays: 892,
      likes: 156
    },
    {
      id: 3,
      title: "Café Dreams",
      mood: "focused",
      genre: "lofi",
      duration: "5:01",
      creator: "Khách hàng Linh N.",
      plays: 2103,
      likes: 234
    }
  ];

  const generateMusic = async () => {
    if (!formData.customerName.trim()) {
      toast({
        title: "Vui lòng nhập tên",
        description: "Chúng tôi cần tên của bạn để tạo nhạc cá nhân hóa",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const newTrack = {
        id: Date.now(),
        title: `${formData.customerName}'s ${moods.find(m => m.value === formData.mood)?.label} Mix`,
        mood: formData.mood,
        genre: formData.genre,
        tempo: formData.tempo[0],
        duration: `${Math.floor(formData.duration[0] / 60)}:${(formData.duration[0] % 60).toString().padStart(2, '0')}`,
        description: formData.description,
        creator: formData.customerName,
        createdAt: new Date().toLocaleString('vi-VN'),
        plays: 0,
        likes: 0
      };
      
      setGeneratedTrack(newTrack);
      setIsGenerating(false);
      
      toast({
        title: "Tạo nhạc thành công!",
        description: `Bài hát "${newTrack.title}" đã được tạo cho bạn`
      });
    }, 3000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Đã tạm dừng" : "Đang phát",
      description: generatedTrack ? generatedTrack.title : "Demo track"
    });
  };

  const shareTrack = () => {
    toast({
      title: "Đã sao chép link",
      description: "Link bài hát đã được sao chép vào clipboard"
    });
  };

  const downloadTrack = () => {
    toast({
      title: "Đang tải xuống",
      description: "Bài hát sẽ được tải về máy của bạn"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-primary" />
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                AI Technology
              </Badge>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              AI Music <span className="text-primary">Studio</span>
            </h1>
            <p className="font-inter text-lg md:text-xl mb-8 text-white/90 max-w-3xl">
              Trải nghiệm công nghệ AI tiên tiến để tạo ra những giai điệu độc đáo, 
              được cá nhân hóa theo sở thích và cảm xúc của bạn
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                <span>Tạo nhạc trong 30 giây</span>
              </div>
              <div className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-primary" />
                <span>Vô số phong cách</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                <span>100% cá nhân hóa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* AI Music Generator */}
            <div>
              <div className="mb-8">
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
                  Tạo nhạc với AI
                </h2>
                <p className="text-muted-foreground">
                  Điền thông tin bên dưới để AI tạo ra bài nhạc riêng cho bạn
                </p>
              </div>

              <Card className="bg-card/70 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-primary" />
                    Cài đặt AI Music
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Name */}
                  <div>
                    <Label htmlFor="customerName" className="text-sm font-medium text-foreground mb-2 block">
                      Tên của bạn *
                    </Label>
                    <Input
                      id="customerName"
                      placeholder="Nhập tên để cá nhân hóa bài nhạc"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="bg-background/50 border-primary/30"
                    />
                  </div>

                  {/* Mood Selection */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">
                      Tâm trạng
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {moods.map((mood) => (
                        <Button
                          key={mood.value}
                          variant={formData.mood === mood.value ? "default" : "outline"}
                          className={`${formData.mood === mood.value ? 'bg-gradient-accent text-primary-foreground' : ''} text-sm`}
                          onClick={() => setFormData({...formData, mood: mood.value})}
                        >
                          <div className={`w-3 h-3 rounded-full ${mood.color} mr-2`}></div>
                          {mood.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Genre Selection */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">
                      Thể loại
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {genres.map((genre) => (
                        <Button
                          key={genre.value}
                          variant={formData.genre === genre.value ? "default" : "outline"}
                          className={`${formData.genre === genre.value ? 'bg-gradient-accent text-primary-foreground' : ''} text-sm`}
                          onClick={() => setFormData({...formData, genre: genre.value})}
                        >
                          {genre.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Tempo */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">
                      Tempo: {formData.tempo[0]} BPM
                    </Label>
                    <Slider
                      value={formData.tempo}
                      onValueChange={(value) => setFormData({...formData, tempo: value})}
                      max={180}
                      min={60}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-3 block">
                      Thời lượng: {Math.floor(formData.duration[0] / 60)}:{(formData.duration[0] % 60).toString().padStart(2, '0')}
                    </Label>
                    <Slider
                      value={formData.duration}
                      onValueChange={(value) => setFormData({...formData, duration: value})}
                      max={300}
                      min={60}
                      step={15}
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                      Mô tả thêm (tùy chọn)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả cảm xúc, hoàn cảnh hoặc ý tưởng cho bài nhạc..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-background/50 border-primary/30 min-h-[80px]"
                    />
                  </div>

                  {/* Generate Button */}
                  <Button 
                    className="w-full bg-gradient-accent text-primary-foreground py-6 text-lg font-semibold"
                    onClick={generateMusic}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Đang tạo nhạc...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Tạo nhạc với AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Generated Track & Samples */}
            <div>
              {/* Generated Track */}
              {generatedTrack && (
                <div className="mb-8">
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                    Bài nhạc của bạn
                  </h3>
                  <Card className="bg-gradient-accent/10 border-primary/30">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-hero rounded-lg flex items-center justify-center">
                          <Music className="w-16 h-16 text-primary" />
                        </div>
                        <h4 className="font-playfair text-xl font-bold text-foreground mb-2">
                          {generatedTrack.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Được tạo bởi AI • {generatedTrack.createdAt}
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                          <Badge className="bg-primary/20 text-primary">
                            {moods.find(m => m.value === generatedTrack.mood)?.label}
                          </Badge>
                          <Badge variant="outline">
                            {genres.find(g => g.value === generatedTrack.genre)?.label}
                          </Badge>
                          <span>{generatedTrack.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <Button size="icon" className="bg-gradient-accent text-primary-foreground" onClick={togglePlay}>
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <div className="flex-1 h-2 bg-muted rounded-full max-w-xs">
                          <div className="w-1/4 h-full bg-primary rounded-full"></div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline" onClick={shareTrack}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Chia sẻ
                        </Button>
                        <Button className="flex-1" variant="outline" onClick={downloadTrack}>
                          <Download className="w-4 h-4 mr-2" />
                          Tải về
                        </Button>
                      </div>
                      
                      {generatedTrack.description && (
                        <div className="mt-4 p-3 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Mô tả:</strong> {generatedTrack.description}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Sample Tracks */}
              <div>
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  Mẫu nhạc AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Khám phá những bài nhạc được tạo bởi khách hàng khác
                </p>
                
                <div className="space-y-4">
                  {sampleTracks.map((track) => (
                    <Card key={track.id} className="bg-card/50 border-primary/10 hover:bg-card/70 hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <Play className="w-4 h-4" />
                          </Button>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">{track.title}</h4>
                            <p className="text-sm text-muted-foreground truncate">Tạo bởi: {track.creator}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {moods.find(m => m.value === track.mood)?.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {genres.find(g => g.value === track.genre)?.label}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Headphones className="w-4 h-4 mr-1" />
                              {track.plays}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {track.likes}
                            </div>
                            <span>{track.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIMusicDemo;