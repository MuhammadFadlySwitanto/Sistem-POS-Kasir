import type { Product } from './types';
import espressoImg from './assets/espresso-cappucino.jpg';
import cappuImg from './assets/cappuccino-005.jpg';
import Cpastry from './assets/coklatpastry.jpg';
import Csalad from './assets/caesar-salad.jpg';
import BlueberryMfn from './assets/blueberrymuffin.webp';
import MatchaLtte from './assets/matchalatte.jpg';
import Americano from './assets/Americano-Coffee.webp';
import ChLatte from './assets/chai-latte-9.jpg';
import Croissant from './assets/dessert-croissant.jpg';
import Bagel from './assets/Bagel-Egg-Sandwich.jpg';
import AvoToast from './assets/AvocadoToast.jpg';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Espresso', price: 3.50, category: 'Coffee', image: espressoImg },
  { id: 2, name: 'Cappuccino', price: 4.50, category: 'Coffee', image: cappuImg },
  { id: 3, name: 'Latte', price: 4.75, category: 'Coffee', image: '' },
  { id: 4, name: 'Americano', price: 3.75, category: 'Coffee', image: Americano },
  { id: 5, name: 'Chai Latte', price: 4.25, category: 'Tea', image: ChLatte },
  { id: 6, name: 'Matcha Latte', price: 5.00, category: 'Tea', image: MatchaLtte },
  { id: 7, name: 'Earl Grey', price: 3.25, category: 'Tea', image: '' },
  { id: 8, name: 'Iced Green Tea', price: 3.50, category: 'Tea', image: '' },
  { id: 9, name: 'Blueberry Muffin', price: 3.75, category: 'Pastries', image: BlueberryMfn },
  { id: 10, name: 'Croissant', price: 3.25, category: 'Pastries', image: Croissant },
  { id: 11, name: 'Chocolate Cake', price: 5.50, category: 'Pastries', image: Cpastry },
  { id: 12, name: 'Cinnamon Roll', price: 4.00, category: 'Pastries', image: '' },
  { id: 13, name: 'Bagel', price: 2.75, category: 'Food', image: Bagel },
  { id: 14, name: 'Avocado Toast', price: 6.50, category: 'Food', image: AvoToast },
  { id: 15, name: 'Club Sandwich', price: 7.50, category: 'Food', image: '' },
  { id: 16, name: 'Caesar Salad', price: 8.00, category: 'Food', image: Csalad },
];

export const CATEGORIES = ['All', 'Coffee', 'Tea', 'Pastries', 'Food'] as const;

export const TAX_RATE = 0.10;
