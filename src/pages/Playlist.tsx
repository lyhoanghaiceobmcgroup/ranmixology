import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Heart, 
  Share2, 
  Download,
  Clock,
  Users,
  Headphones,
  Star,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Playlist = () => {
  const { toast } = useToast();
  const [selectedBranch, setSelectedBranch] = useState("ngo-quyen");
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState<number[]>([]);

  const branches = {
    "ngo-quyen": {
      name: "RAN Signature - Ngô Quyền",
      playlistName: "RAN Flagship Vibes",
      mood: "Premium & Artistic",
      description: "Những giai điệu tinh tế cho không gian flagship đẳng cấp",
      totalTracks: 24,
      totalDuration: "1h 47m",
      monthlyListeners: 2847,
      tracks: [
        {
          id: 1,
          title: "Morning Harmony",
          artist: "RAN AI Studio",
          duration: "4:23",
          genre: "Ambient Jazz",
          mood: "Peaceful",
          plays: 1247,
          isAIGenerated: true,
          createdBy: "Khách hàng Minh A."
        },
        {
          id: 2,
          title: "Golden Hour Latte",
          artist: "RAN AI Studio",
          duration: "3:45",
          genre: "Lo-fi Hip Hop",
          mood: "Relaxing",
          plays: 892,
          isAIGenerated: true,
          createdBy: "Khách hàng Thu H."
        },
        {
          id: 3,
          title: "Signature Blend",
          artist: "RAN Collective",
          duration: "5:12",
          genre: "Neo Soul",
          mood: "Sophisticated",
          plays: 1534,
          isAIGenerated: false,
          createdBy: "RAN Music Team"
        },
        {
          id: 4,
          title: "Rooftop Dreams",
          artist: "RAN AI Studio",
          duration: "4:01",
          genre: "Chillwave",
          mood: "Dreamy",
          plays: 756,
          isAIGenerated: true,
          createdBy: "Khách hàng Linh N."
        },
        {
          id: 5,
          title: "Artistic Flow",
          artist: "RAN AI Studio",
          duration: "3:28",
          genre: "Experimental",
          mood: "Creative",
          plays: 623,
          isAIGenerated: true,
          createdBy: "Khách hàng Đức M."
        }
      ]
    },
    "nguyen-binh-khiem": {
      name: "RAN Signature - Nguyễn Bỉnh Khiêm",
      playlistName: "Urban Energy Mix",
      mood: "Dynamic & Energetic",
      description: "Nhịp điệu sôi động cho không gian đô thị hiện đại",
      totalTracks: 28,
      totalDuration: "2h 03m",
      monthlyListeners: 3254,
      tracks: [
        {
          id: 6,
          title: "City Rush",
          artist: "RAN AI Studio",
          duration: "3:52",
          genre: "Electronic Pop",
          mood: "Energetic",
          plays: 1876,
          isAIGenerated: true,
          createdBy: "Khách hàng Hùng T."
        },
        {
          id: 7,
          title: "Metro Vibes",
          artist: "RAN AI Studio",
          duration: "4:15",
          genre: "Future Bass",
          mood: "Uplifting",
          plays: 1432,
          isAIGenerated: true,
          createdBy: "Khách hàng Mai L."
        },
        {
          id: 8,
          title: "Coworking Anthem",
          artist: "RAN Collective",
          duration: "3:33",
          genre: "Indie Electronic",
          mood: "Focused",
          plays: 2103,
          isAIGenerated: false,
          createdBy: "RAN Music Team"
        },
        {
          id: 9,
          title: "Urban Sunset",
          artist: "RAN AI Studio",
          duration: "4:47",
          genre: "Synthwave",
          mood: "Nostalgic",
          plays: 987,
          isAIGenerated: true,
          createdBy: "Khách hàng Phong V."
        },
        {
          id: 10,
          title: "Downtown Pulse",
          artist: "RAN AI Studio",
          duration: "3:19",
          genre: "Tech House",
          mood: "Dynamic",
          plays: 1654,
          isAIGenerated: true,
          createdBy: "Khách hàng Anh K."
        }
      ]
    }
  };

  const currentBranch = branches[selectedBranch as keyof typeof branches];
  const currentTrackData = currentBranch.tracks[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Đã tạm dừng" : "Đang phát",
      description: `${currentTrackData.title} - ${currentTrackData.artist}`
    });
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % currentBranch.tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + currentBranch.tracks.length) % currentBranch.tracks.length);
  };

  const toggleLike = (trackId: number) => {
    setLikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const sharePlaylist = () => {
    toast({
      title: "Đã sao chép link",
      description: "Link playlist đã được sao chép vào clipboard"
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              RAN <span className="text-primary">Playlist</span>
            </h1>
            <p className="font-inter text-lg md:text-xl mb-8 text-white/90">
              Khám phá những giai điệu độc đáo được tạo ra bởi AI và cộng đồng RAN
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center">
                <Music className="w-5 h-5 mr-2" />
                <span>52 bài hát</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>6,101 người nghe</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>3h 50m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Branch Selector */}
          <div className="mb-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              Chọn chi nhánh
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(branches).map(([key, branch]) => (
                <Button
                  key={key}
                  variant={selectedBranch === key ? "default" : "outline"}
                  className={`${selectedBranch === key ? 'bg-gradient-accent text-primary-foreground' : ''}`}
                  onClick={() => {
                    setSelectedBranch(key);
                    setCurrentTrack(0);
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {branch.name.split(" - ")[1]}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Playlist Info */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-accent/10 border-primary/30 mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-48 h-48 mx-auto mb-4 bg-gradient-hero rounded-lg flex items-center justify-center">
                      <Music className="w-20 h-20 text-primary" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                      {currentBranch.playlistName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {currentBranch.description}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span>{currentBranch.totalTracks} bài</span>
                      <span>•</span>
                      <span>{currentBranch.totalDuration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Mood:</span>
                      <Badge className="bg-primary/20 text-primary">{currentBranch.mood}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Người nghe/tháng:</span>
                      <span className="font-semibold text-foreground">{currentBranch.monthlyListeners.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1 bg-gradient-accent text-primary-foreground" onClick={sharePlaylist}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Chia sẻ
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Now Playing */}
              <Card className="bg-card/70 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-playfair text-lg font-bold text-foreground mb-4">
                    Đang phát
                  </h4>
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 mx-auto mb-3 bg-gradient-hero rounded-lg flex items-center justify-center">
                      <Music className="w-12 h-12 text-primary" />
                    </div>
                    <h5 className="font-semibold text-foreground mb-1">{currentTrackData.title}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{currentTrackData.artist}</p>
                    <Badge variant="outline" className="text-xs">{currentTrackData.genre}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" onClick={prevTrack}>
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    <Button size="icon" className="bg-gradient-accent text-primary-foreground" onClick={togglePlay}>
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextTrack}>
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">1:23</span>
                    <div className="flex-1 h-1 bg-muted rounded-full">
                      <div className="w-1/3 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{currentTrackData.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Track List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-xl font-bold text-foreground">
                  Danh sách bài hát
                </h3>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {currentBranch.monthlyListeners.toLocaleString()} lượt nghe
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {currentBranch.tracks.map((track, index) => (
                  <Card 
                    key={track.id} 
                    className={`cursor-pointer transition-all duration-300 ${
                      currentTrack === index 
                        ? 'bg-gradient-accent/20 border-primary shadow-glow' 
                        : 'bg-card/50 border-primary/10 hover:bg-card/70 hover:border-primary/20'
                    }`}
                    onClick={() => setCurrentTrack(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-10 h-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTrack(index);
                              togglePlay();
                            }}
                          >
                            {currentTrack === index && isPlaying ? 
                              <Pause className="w-4 h-4" /> : 
                              <Play className="w-4 h-4" />
                            }
                          </Button>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground truncate">{track.title}</h4>
                            {track.isAIGenerated && (
                              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                                AI
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{track.genre}</Badge>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{track.plays} lượt phát</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(track.id);
                            }}
                          >
                            <Heart 
                              className={`w-4 h-4 ${
                                likedTracks.includes(track.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                          <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
                            {track.duration}
                          </span>
                        </div>
                      </div>
                      
                      {track.isAIGenerated && (
                        <div className="mt-2 pt-2 border-t border-primary/10">
                          <p className="text-xs text-muted-foreground">
                            <Star className="w-3 h-3 inline mr-1" />
                            Được tạo bởi: {track.createdBy}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Playlist;