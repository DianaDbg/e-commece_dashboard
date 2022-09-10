import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginAdmin } from '../../models/loginAdmin';
import { Router } from '@angular/router';

const USER_DATA = 'user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(data: LoginAdmin) {
    return this.httpClient.post<LoginAdmin>(
      `${environment.baseUrl}users/auths/admins/login`,
      data
    );
  }

  hasToken() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getId() {
    if (localStorage.getItem(USER_DATA)) {
      const data: any = localStorage.getItem(USER_DATA);
      const adminData: any = JSON.parse(data);
      const id = adminData.data.id;
      return id;
    }
  }

  saveUserData(data: any) {
    window.localStorage.removeItem(USER_DATA);
    window.localStorage.setItem(USER_DATA, JSON.stringify(data));
  }

  getToken() {
    if (window.localStorage.getItem(USER_DATA)) {
      const userData: any = window.localStorage.getItem(USER_DATA);
      const adminData: any = JSON.parse(userData);
      const token = adminData.data.token;
      return token;
    }
  }

  logout() {
    window.localStorage.clear();
    window.location.reload();
  }
}
