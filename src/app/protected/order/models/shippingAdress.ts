import {Adress} from './adress'

export interface ShippingAdress{
    id? : string;
    adress : Adress | string;
    user? : string;
    creeated_at? : string;
    update_at? : string;
}