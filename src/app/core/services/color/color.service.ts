import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColorDto } from 'src/app/protected/product/ProductDto/ProductDto';
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

  saveColor(color: ColorDto) {
    return this.httpClient.post<ColorDto>(this.baseUrl, color, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
