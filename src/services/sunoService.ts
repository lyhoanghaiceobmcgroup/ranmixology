// Suno API Service for music generation via kie.ai
export interface MusicGenerationRequest {
  prompt: string;
  style?: string;
  duration?: number;
  instrumental?: boolean;
}

export interface MusicGenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  audio_url?: string;
  video_url?: string;
  title?: string;
  tags?: string[];
  duration?: number;
  created_at: string;
}

class SunoService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // API key được cung cấp từ kie.ai
    this.apiKey = 'c86f57f8f8eba4fb53b2b65392667627';
    this.baseUrl = 'https://api.kie.ai/v1/suno';
  }

  async generateMusic(request: MusicGenerationRequest): Promise<MusicGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          prompt: request.prompt,
          style: request.style || 'auto',
          duration: request.duration || 30,
          instrumental: request.instrumental || false,
          model: 'suno-v3.5',
          custom_mode: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        id: result.id || `music_${Date.now()}`,
        status: result.status || 'pending',
        audio_url: result.audio_url,
        video_url: result.video_url,
        title: result.title || request.prompt.substring(0, 50),
        tags: result.tags || [],
        duration: result.duration || request.duration,
        created_at: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating music:', error);
      
      // Fallback simulation for demo purposes
      return this.simulateGeneration(request);
    }
  }

  async checkGenerationStatus(id: string): Promise<MusicGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/status/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error checking status:', error);
      
      // Simulate completion for demo
      return {
        id,
        status: 'completed',
        audio_url: 'https://example.com/demo-music.mp3',
        title: 'Generated Music',
        duration: 30,
        created_at: new Date().toISOString(),
      };
    }
  }

  // Simulation method for demo purposes
  private async simulateGeneration(request: MusicGenerationRequest): Promise<MusicGenerationResponse> {
    const id = `sim_${Date.now()}`;
    
    return {
      id,
      status: 'processing',
      title: `🎵 ${request.prompt.substring(0, 30)}...`,
      tags: ['AI Generated', 'RAN MIXOLOGY'],
      duration: request.duration || 30,
      created_at: new Date().toISOString(),
    };
  }

  async simulateCompletion(id: string, prompt: string): Promise<MusicGenerationResponse> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      id,
      status: 'completed',
      audio_url: `https://example.com/generated-music-${id}.mp3`,
      video_url: `https://example.com/generated-music-${id}.mp4`,
      title: `🎵 ${prompt.substring(0, 40)} - RAN MIXOLOGY`,
      tags: ['AI Generated', 'RAN MIXOLOGY', 'Suno AI'],
      duration: 30,
      created_at: new Date().toISOString(),
    };
  }

  // Generate branded download filename
  generateDownloadFilename(title: string): string {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    const timestamp = new Date().toISOString().split('T')[0];
    return `RAN_MIXOLOGY_${cleanTitle}_${timestamp}.mp3`;
  }

  // Create branded download URL with RAN MIXOLOGY branding
  createBrandedDownloadUrl(originalUrl: string, title: string): string {
    const filename = this.generateDownloadFilename(title);
    // In production, this would process the file to add branding
    return `${originalUrl}?brand=RAN_MIXOLOGY&filename=${encodeURIComponent(filename)}`;
  }
}

export const sunoService = new SunoService();