import {Cart} from './cart';
import {ShippingAdress} from './shippingAdress';
import { Shipment } from './shipment';
import {User} from './user';

export interface Order{
    id? : string;
    number? : string;
    cart : Cart | string;
    user? : User | string;
    shipping_address? : ShippingAdress | string;
    shipment? : Shipment | string;
    shipping_tax? : string;
    total_prices? : string;
    total_tax? : string;
    payment_method? : string;
    transaction_id? : string;
    status? :  string;
}