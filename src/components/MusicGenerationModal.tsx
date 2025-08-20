import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music2, Loader2, Download, Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MusicGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  drinkName: string;
  mood: string[];
}

const MusicGenerationModal = ({ isOpen, onClose, drinkName, mood }: MusicGenerationModalProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const generateMusic = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập mô tả cho bản nhạc",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setMusicUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-music', {
        body: {
          prompt,
          drinkName,
          mood: mood.join(', ')
        }
      });

      if (error) throw error;

      if (data.success) {
        setPredictionId(data.predictionId);
        toast({
          title: "Đang tạo nhạc",
          description: "Bản nhạc đang được tạo, vui lòng đợi...",
        });
        
        // Poll for completion
        pollForCompletion(data.predictionId);
      } else {
        throw new Error(data.error || 'Failed to generate music');
      }
    } catch (error) {
      console.error('Error generating music:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo nhạc. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const pollForCompletion = async (id: string) => {
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;

    const poll = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-music-status', {
          body: { predictionId: id }
        });

        if (error) throw error;

        if (data.status === 'succeeded' && data.output) {
          setMusicUrl(data.output);
          setIsGenerating(false);
          toast({
            title: "Thành công",
            description: "Bản nhạc đã được tạo!",
          });
          return;
        } else if (data.status === 'failed') {
          throw new Error('Music generation failed');
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000); // Poll every 5 seconds
        } else {
          throw new Error('Timeout waiting for music generation');
        }
      } catch (error) {
        console.error('Error polling music status:', error);
        setIsGenerating(false);
        toast({
          title: "Lỗi",
          description: "Có lỗi xảy ra khi tạo nhạc",
          variant: "destructive",
        });
      }
    };

    poll();
  };

  const playMusic = () => {
    if (!musicUrl) return;

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(musicUrl);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.addEventListener('error', () => {
        toast({
          title: "Lỗi",
          description: "Không thể phát nhạc",
          variant: "destructive",
        });
        setIsPlaying(false);
      });
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  const downloadMusic = () => {
    if (!musicUrl) return;
    
    const link = document.createElement('a');
    link.href = musicUrl;
    link.download = `${drinkName}-music.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-primary" />
            Tạo nhạc cho {drinkName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Tâm trạng: {mood.join(", ")}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Mô tả cảm xúc hoặc phong cách nhạc bạn muốn:
            </p>
            <Textarea
              placeholder="VD: Nhạc jazz nhẹ nhàng với âm thanh saxophone, phù hợp cho buổi chiều thư giãn..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {isGenerating && (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Đang tạo bản nhạc dành riêng cho bạn...</p>
              <p className="text-xs text-muted-foreground mt-2">Quá trình này có thể mất 1-3 phút</p>
            </div>
          )}

          {musicUrl && (
            <div className="bg-card/50 rounded-lg p-6 text-center">
              <Music2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground mb-4">Bản nhạc của bạn đã sẵn sàng!</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={playMusic} className="flex items-center gap-2">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Tạm dừng" : "Phát nhạc"}
                </Button>
                <Button variant="outline" onClick={downloadMusic} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Tải xuống
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={generateMusic} 
              disabled={isGenerating || !prompt.trim()}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Music2 className="w-4 h-4 mr-2" />
                  Tạo nhạc
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicGenerationModal;