import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {LoginAdmin} from '../../models/loginAdmin'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(data: LoginAdmin){
    return this.httpClient.post<LoginAdmin>(`${environment.baseUrl}users/auths/admins/login`, data)
  }

  hasToken() {
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
    
  }

  getId() {
    if(localStorage.getItem('admin')){
      const data: any = localStorage.getItem('admin')
      const adminData: any = JSON.parse(data);
      const id = adminData.data.id;
      // return id;
    }
    return 'fa6088e9-fb50-45c4-b57d-51485d2e5686';
  }

  saveAdmin(data:any){
    localStorage.setItem('admin', JSON.stringify(data))
  }

  getToken() {
    if(localStorage.getItem('admin')){
      const data: any = localStorage.getItem('admin')
      const adminData: any = JSON.parse(data);
      const token = adminData.data.token;
      // return token;
    }
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImZhNjA4OGU5LWZiNTAtNDVjNC1iNTdkLTUxNDg1ZDJlNTY4NiIsImV4cCI6MTYzOTIyNzg4Mn0.A3dSL2GeiTImbVlZ9Z40nuABpnLzsud-JSUuJT3fLvg';
  }

  logout(){
    localStorage.removeItem('admin');
    this.router.navigate(['/login'])
  }

}
