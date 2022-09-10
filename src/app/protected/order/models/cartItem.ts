import {Product} from '../../product/models/product';
import {Size} from '../../product/models/size';
import {Color} from '../../product/models/color';

export interface CartItem{
    id? : string;
    product : Product | string;
    quantity? : number;
    size? : Size | string;
    color? :  Color | string;
    
}