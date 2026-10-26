export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'INR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
  label: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  fit: 'True to Size' | 'Slightly Generous' | 'Fitted';
  comment: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  category: 'outerwear' | 'evening' | 'blazers' | 'knitwear' | 'accessories';
  categoryLabel: string;
  price: number; // in USD base
  originalPrice?: number;
  tag?: string;
  description: string;
  composition: string;
  millOrigin: string;
  details: string[];
  care: string[];
  sizes: string[];
  colors: ProductColor[];
  primaryImage: string;
  secondaryImage?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  featured?: boolean;
  bestseller?: boolean;
}

export interface CartItem {
  id: string; // unique item key e.g. `${product.id}-${color}-${size}`
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface StyleLook {
  id: string;
  lookNumber: string;
  title: string;
  subtitle: string;
  season: string;
  editorialImage: string;
  quote: string;
  stylistNote: string;
  productIds: string[];
}

export interface OrderData {
  orderId: string;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: Currency;
  estimatedDelivery: string;
}
