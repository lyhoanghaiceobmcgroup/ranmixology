export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  branch: string;
  type: string;
  capacity: number;
  registered: number;
  price: number;
  image: string;
  featured: boolean;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  totalParticipants: number;
  featuredEvents: number;
}

class EventsService {
  private events: Event[] = [];
  private subscribers: ((events: Event[]) => void)[] = [];

  constructor() {
    // Initialize with some default events if needed
    this.events = [];
  }

  getEvents(): Event[] {
    return this.events;
  }

  getEventStats(): EventStats {
    return {
      totalEvents: this.events.length,
      upcomingEvents: this.events.filter(event => new Date(event.date) > new Date()).length,
      totalParticipants: this.events.reduce((sum, event) => sum + event.registered, 0),
      featuredEvents: this.events.filter(event => event.featured).length
    };
  }

  subscribe(callback: (events: Event[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.events));
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.notifySubscribers();
  }

  updateEvent(id: string, updates: Partial<Event>) {
    const index = this.events.findIndex(event => event.id === id);
    if (index > -1) {
      this.events[index] = { ...this.events[index], ...updates };
      this.notifySubscribers();
    }
  }

  removeEvent(id: string) {
    this.events = this.events.filter(event => event.id !== id);
    this.notifySubscribers();
  }
}

export const eventsService = new EventsService();
export default eventsService;