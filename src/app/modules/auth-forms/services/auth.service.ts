import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login() {
    console.log('login');
  }

  register() {
    console.log('register');
  }

  logout() {
    console.log('logout');
  }
}
