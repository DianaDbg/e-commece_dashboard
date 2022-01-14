import { Size } from './size';
import { File } from './file';

export interface Color {
  id?: string;
  name: string;
  code: string;
  images: File[];
  sizes: Size[];
  created_by: string;
}
