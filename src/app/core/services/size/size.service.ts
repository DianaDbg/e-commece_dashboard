import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from 'src/app/protected/product/models/size';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  readonly baseUrl = environment.baseUrl + 'sizes';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  saveSize(size: Size) {
    return this.httpClient.post<Size>(this.baseUrl, size, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
