import { Category } from './category';
import { Color } from './color';

export interface Product {
  id?: string;
  name: string;
  slug: string;
  description: string;
  category: Category | string;
  colors: Color[] | string;
  quantity: number;
  price: string;
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}
