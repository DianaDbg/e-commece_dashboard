export interface User{
    id? : string;
    username : string;
    is_staff : boolean;
    is_verified : boolean;
    account_type : string;
    gender : string;
    fullname : string;
}