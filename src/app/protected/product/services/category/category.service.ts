import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/models/response/response';
import { Category } from '../../models/category';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly baseUrl = environment.baseUrl + 'categories';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCategories() {
    return this.httpClient.get<Response<Category[]>>(this.baseUrl);
  }

  getCategory(id: string) {
    return this.httpClient.get<Response<Category>>(this.baseUrl + '/' + id);
  }

  saveCategory(category: Category) {
    return this.httpClient.post<Category>(
      this.baseUrl,
      {
        ...category,
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

  updateCategory(category: Category) {
    return this.httpClient.put(
      this.baseUrl + '/' + category.id,
      {
        ...category,
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

  deleteCategory(id: string) {
    return this.httpClient.delete(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }
}
