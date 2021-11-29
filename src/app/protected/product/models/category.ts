export interface Category {
  id?: string;
  name: string;
  slug: string;
  description: string;
  parent?: Category | null | string;
  image: File | string;
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  children?: Category[];
}
