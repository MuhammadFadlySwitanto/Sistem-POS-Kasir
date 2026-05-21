export type Category = 'All' | 'Coffee' | 'Tea' | 'Pastries' | 'Food';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, 'All'>;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'Cash' | 'QRIS' | 'Card';
