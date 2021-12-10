import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  hasToken() {
    return true;
  }

  getId() {
    return 'fa6088e9-fb50-45c4-b57d-51485d2e5686';
  }

  getToken() {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImZhNjA4OGU5LWZiNTAtNDVjNC1iNTdkLTUxNDg1ZDJlNTY4NiIsImV4cCI6MTYzOTIyNzg4Mn0.A3dSL2GeiTImbVlZ9Z40nuABpnLzsud-JSUuJT3fLvg';
  }
}
