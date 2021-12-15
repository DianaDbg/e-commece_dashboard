import { Size } from '../models/size';
export interface ColorForm {
  name: string;
  code: string;
  images: File[];
  sizes: Size[];
}
export interface ProductForm {
  name: string;
  slug: string;
  description: string;
  category: string;
  colors: ColorForm[];
  price: string;
}
export interface ColorDto {
  name: string;
  code: string;
  images: string[];
  sizes: string[];
  created_by: string;
}
