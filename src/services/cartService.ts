export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  category: string;
  mood: string[];
  branch: string[];
  specialty: string;
  image: string;
  ingredients?: string[];
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  selectedBranch: string;
}

class CartService {
  private cart: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    selectedBranch: ''
  };
  private subscribers: ((cart: CartState) => void)[] = [];

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('ranmixology_cart');
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('ranmixology_cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  private updateTotals() {
    this.cart.totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + (item.priceNumber * item.quantity), 0);
  }

  private notifySubscribers() {
    this.updateTotals();
    this.saveToLocalStorage();
    this.subscribers.forEach(callback => callback({ ...this.cart }));
  }

  addItem(item: Omit<CartItem, 'id' | 'quantity'>) {
    const existingItemIndex = this.cart.items.findIndex(cartItem => 
      cartItem.name === item.name && cartItem.category === item.category
    );

    if (existingItemIndex > -1) {
      this.cart.items[existingItemIndex].quantity += 1;
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.category}_${item.name}_${Date.now()}`,
        quantity: 1
      };
      this.cart.items.push(newItem);
    }

    this.notifySubscribers();
  }

  removeItem(itemId: string) {
    this.cart.items = this.cart.items.filter(item => item.id !== itemId);
    this.notifySubscribers();
  }

  updateQuantity(itemId: string, quantity: number) {
    const itemIndex = this.cart.items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.cart.items[itemIndex].quantity = quantity;
        this.notifySubscribers();
      }
    }
  }

  clearCart() {
    this.cart.items = [];
    this.cart.selectedBranch = '';
    this.notifySubscribers();
  }

  setSelectedBranch(branch: string) {
    this.cart.selectedBranch = branch;
    this.notifySubscribers();
  }

  getCart(): CartState {
    return { ...this.cart };
  }

  subscribe(callback: (cart: CartState) => void): () => void {
    this.subscribers.push(callback);
    // Immediately call with current state
    callback({ ...this.cart });
    
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Convert price string to number (e.g., "125,000đ" -> 125000)
  static parsePriceString(priceStr: string): number {
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  }

  // Format number to price string (e.g., 125000 -> "125,000đ")
  static formatPrice(price: number): string {
    return `${price.toLocaleString('vi-VN')}đ`;
  }
}

export const cartService = new CartService();
export default cartService;