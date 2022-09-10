import { Address } from '../address/address';

export interface User {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string | undefined;
  profile_picture?: string;
}
