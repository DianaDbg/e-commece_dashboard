import {Parcel } from './parcel'

export interface Shipment{
    shippo_id? : string
    adress_from : string
    adress_to : string
    parcels : Parcel[] | string[]
}