import { Gender } from 'src/app/core/enums/gender';

export interface Customer {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  orders: number;
}
