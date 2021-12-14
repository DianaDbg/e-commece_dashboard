import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/models/response/response';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly baseUrl = environment.baseUrl + 'products';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // UTILS
  getFirstImage(product: Product) {
    let file: string = '...';

    if (typeof product.colors[0] === 'object') {
      file = product.colors[0].images[0].file;
    }

    return file;
  }

  //HTTP REQUESTS

  getProducts() {
    return this.httpClient.get<Response<Product[]>>(this.baseUrl);
  }

  getProductById(id: string) {
    return this.httpClient.get<Response<Product>>(this.baseUrl + '/' + id);
  }

  saveProduct(product: Product) {
    return this.httpClient.post<Product>(
      this.baseUrl,
      {
        ...product,
        created_by: this.authService.getId(),
      },
      {
        headers: new HttpHeaders({
          Authorization: 'token ' + this.authService.getToken(),
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  updateProduct(product: Product) {
    return this.httpClient.put(this.baseUrl + '/' + product.id, product, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteProduct(product: Product) {
    return this.httpClient.delete(this.baseUrl + '/' + product.id, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }
}
