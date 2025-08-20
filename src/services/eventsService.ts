// Real-time events service for RAN branches
export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  branch: string;
  price: string;
  seats: number;
  available: number;
  description: string;
  image: string;
  highlights: string[];
  type: 'mixology' | 'music' | 'cultural' | 'workshop' | 'art';
  featured: boolean;
  offer?: string;
  rating: number;
  status: string;
  registrationDeadline?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  eventId: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

class EventsService {
  private events: Event[] = [];
  private registrations: EventRegistration[] = [];
  private listeners: ((events: Event[]) => void)[] = [];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeEvents();
    this.startRealTimeUpdates();
  }

  // Initialize with mock data that simulates real events
  private initializeEvents() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    this.events = [
      {
        id: 1,
        title: "Mixology & Melody Workshop",
        date: tomorrow,
        time: "19:00 - 22:00",
        location: "RAN Mixology - 35 Nguyễn Bỉnh Khiêm",
        branch: "nguyen-binh-khiem",
        price: "299,000đ",
        seats: 20,
        available: 8,
        description: "Đêm DJ acoustic không cồn kết hợp mocktail sáng tạo - trải nghiệm độc đáo",
        image: "/src/assets/event-mixology-workshop.jpg",
        highlights: ["Live mixology demo", "DJ acoustic set", "3 ly signature mocktail", "Tặng bản nhạc AI độc quyền", "QR check-in nhận token"],
        type: "mixology",
        featured: true,
        offer: "Miễn phí 1 bản nhạc AI trị giá 39.000đ",
        rating: 4.8,
        status: "Sắp full",
        registrationDeadline: today,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "AI Music Night: Sáng tạo âm nhạc",
        date: nextWeek,
        time: "20:00 - 23:00",
        location: "RAN Coffee - Tea - 35 Nguyễn Bỉnh Khiêm",
        branch: "nguyen-binh-khiem",
        price: "199,000đ",
        seats: 30,
        available: 15,
        description: "Đêm nhạc với AI - tạo bản nhạc riêng kết hợp mocktail signature",
        image: "/src/assets/event-music-night.jpg",
        highlights: ["Live demo AI tạo nhạc", "DJ set chuyên nghiệp", "Playlist cá nhân hóa", "NFT bản nhạc", "Cocktail không cồn premium"],
        type: "music",
        featured: false,
        offer: "Combo 2 người giảm 20%",
        rating: 4.9,
        status: "Còn chỗ",
        registrationDeadline: new Date(new Date(nextWeek).getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Tea Ceremony: Nghệ thuật thưởng trà",
        date: nextMonth,
        time: "14:00 - 16:00",
        location: "RAN Bitro - 35 Nguyễn Bỉnh Khiêm",
        branch: "nguyen-binh-khiem",
        price: "249,000đ",
        seats: 12,
        available: 4,
        description: "Lễ trà truyền thống kết hợp không gian hiện đại, hướng dẫn bởi tea master",
        image: "/src/assets/event-tea-ceremony.jpg",
        highlights: ["Tea master chính thống", "4 loại trà cao cấp", "Học nghệ thuật pha trà", "Bộ tea set mini", "Certificate hoàn thành"],
        type: "cultural",
        featured: false,
        offer: "Tặng bộ trà về nhà",
        rating: 4.7,
        status: "Chỉ còn 4 chỗ",
        registrationDeadline: new Date(new Date(nextMonth).getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        title: "Coffee Journey: Từ hạt đến ly",
        date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: "10:00 - 12:00",
        location: "RAN Coffee - Tea - 35 Nguyễn Bỉnh Khiêm",
        branch: "nguyen-binh-khiem",
        price: "179,000đ",
        seats: 15,
        available: 7,
        description: "Workshop khám phá hành trình cà phê từ hạt đến ly hoàn hảo",
        image: "/src/assets/event-coffee-tasting.jpg",
        highlights: ["Barista chuyên nghiệp", "5 loại cà phê premium", "Tự tay pha chế", "Kiến thức chuyên sâu", "Sample beans về nhà"],
        type: "workshop",
        featured: false,
        offer: "Giảm 15% cho nhóm 4 người",
        rating: 4.6,
        status: "Mở đăng ký",
        registrationDeadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        title: "Art & Mix: Sáng tạo nghệ thuật",
        date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: "18:00 - 21:00",
        location: "RAN Bitro - 35 Nguyễn Bỉnh Khiêm",
        branch: "nguyen-binh-khiem",
        price: "359,000đ",
        seats: 25,
        available: 12,
        description: "Kết hợp nghệ thuật vẽ tranh với pha chế đồ uống sáng tạo",
        image: "/src/assets/event-art-mix.jpg",
        highlights: ["Họa sĩ hướng dẫn", "Vật liệu vẽ cao cấp", "Cocktail nghệ thuật", "Tác phẩm mang về", "Live music"],
        type: "art",
        featured: true,
        offer: "Tặng khung tranh cao cấp",
        rating: 4.5,
        status: "Hot event",
        registrationDeadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Simulate real-time updates
  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.simulateEventUpdates();
      this.notifyListeners();
    }, 30000); // Update every 30 seconds
  }

  private simulateEventUpdates() {
    this.events = this.events.map(event => {
      // Simulate seat availability changes
      if (Math.random() < 0.3 && event.available > 0) {
        const newAvailable = Math.max(0, event.available - Math.floor(Math.random() * 3));
        const newStatus = this.getEventStatus(newAvailable, event.seats);
        
        return {
          ...event,
          available: newAvailable,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      
      // Update status based on registration deadline
      const now = new Date();
      const deadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;
      
      if (deadline && now > deadline && event.status !== "Hết hạn đăng ký") {
        return {
          ...event,
          status: "Hết hạn đăng ký",
          isActive: false,
          updatedAt: new Date().toISOString()
        };
      }
      
      return event;
    });
  }

  private getEventStatus(available: number, total: number): string {
    const ratio = available / total;
    if (available === 0) return "Hết chỗ";
    if (ratio <= 0.2) return "Chỉ còn " + available + " chỗ";
    if (ratio <= 0.4) return "Sắp full";
    return "Còn chỗ";
  }

  // Public methods
  public getEvents(): Event[] {
    return this.events.filter(event => event.isActive);
  }

  public getEventsByBranch(branch: string): Event[] {
    return this.events.filter(event => event.isActive && event.branch === branch);
  }

  public getFeaturedEvents(): Event[] {
    return this.events.filter(event => event.isActive && event.featured);
  }

  public getUpcomingEvents(limit: number = 5): Event[] {
    const now = new Date();
    return this.events
      .filter(event => event.isActive && new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  }

  public searchEvents(query: string): Event[] {
    const lowercaseQuery = query.toLowerCase();
    return this.events.filter(event => 
      event.isActive && (
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.location.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  public registerForEvent(eventId: number, registration: Omit<EventRegistration, 'eventId'>): boolean {
    const event = this.events.find(e => e.id === eventId);
    if (!event || event.available <= 0) {
      return false;
    }

    // Add registration
    this.registrations.push({
      ...registration,
      eventId
    });

    // Update event availability
    event.available -= 1;
    event.status = this.getEventStatus(event.available, event.seats);
    event.updatedAt = new Date().toISOString();

    this.notifyListeners();
    return true;
  }

  public addEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event {
    const newEvent: Event = {
      ...event,
      id: Math.max(...this.events.map(e => e.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.events.push(newEvent);
    this.notifyListeners();
    return newEvent;
  }

  public updateEvent(eventId: number, updates: Partial<Event>): boolean {
    const eventIndex = this.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return false;

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.notifyListeners();
    return true;
  }

  public deleteEvent(eventId: number): boolean {
    const eventIndex = this.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return false;

    this.events[eventIndex].isActive = false;
    this.events[eventIndex].updatedAt = new Date().toISOString();
    
    this.notifyListeners();
    return true;
  }

  // Real-time subscription
  public subscribe(callback: (events: Event[]) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    const activeEvents = this.getEvents();
    this.listeners.forEach(callback => callback(activeEvents));
  }

  // Cleanup
  public destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.listeners = [];
  }

  // Get event statistics
  public getEventStats() {
    const activeEvents = this.getEvents();
    const totalSeats = activeEvents.reduce((sum, event) => sum + event.seats, 0);
    const availableSeats = activeEvents.reduce((sum, event) => sum + event.available, 0);
    const occupancyRate = totalSeats > 0 ? ((totalSeats - availableSeats) / totalSeats) * 100 : 0;

    return {
      totalEvents: activeEvents.length,
      totalSeats,
      availableSeats,
      occupancyRate: Math.round(occupancyRate),
      featuredEvents: activeEvents.filter(e => e.featured).length,
      upcomingEvents: this.getUpcomingEvents().length
    };
  }
}

// Export singleton instance
export const eventsService = new EventsService();
export default eventsService;