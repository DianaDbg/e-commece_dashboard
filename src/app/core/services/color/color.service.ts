import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from 'src/app/protected/product/models/color';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  readonly baseUrl = environment.baseUrl + 'colors';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  saveColor(color: Color) {
    return this.httpClient.post<Color>(this.baseUrl, color, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
