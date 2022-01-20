import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { Address } from 'src/app/shared/models/address/address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly baseUrl = environment.baseUrl + 'addresses';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  saveAddress(address: Address) {
    return this.httpClient.post<Address>(this.baseUrl, address, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
      }),
    });
  }
}
