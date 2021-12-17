export interface Parcel{
    id? : string;
    shippo_id : string;
    parcel_length  : number;
    parcel_width : number;
    parcel_weight : number;
    parcel_height : number;
    distance_unit : string;
    mass_unit : string;
}