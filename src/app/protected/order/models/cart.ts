import {CartItem} from './cartItem';


export interface Cart{
    id? : string;
    owner : string;
    status: string;
    merged_date:  Date;
    items : CartItem[] | string[];
    
}