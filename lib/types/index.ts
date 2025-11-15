export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'round' | 'square' | 'heart' | 'custom';
  material: string;
  features: string[];
  inStock: boolean;
  customizable: boolean;
  bulk: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  customization?: string;
}

export interface FilterOptions {
  category: string[];
  priceRange: [number, number];
  customizable: boolean | null;
  inStock: boolean;
}
