import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/models/response/response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = `${environment.baseUrl}` + 'orders/';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getOrders() {
    return this.httpClient.get<Response<Order[]>>(this.baseUrl + 'admins', {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }

  confirmOrder(order_id: string) {
    return this.httpClient.put(this.baseUrl + `${order_id}` + '/confirm', {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }

  cancelOrder(order_id: string) {
    return this.httpClient.delete(this.baseUrl + `${order_id}`, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }
}
