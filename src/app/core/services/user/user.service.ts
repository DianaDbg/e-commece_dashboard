import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.baseUrl + 'users';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  updateUser(userInfo: User) {
    return this.httpClient.put<User>(this.baseUrl, userInfo, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
