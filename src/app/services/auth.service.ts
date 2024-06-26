import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenHelper = inject(JwtHelperService);

  constructor() {
    if (this.isAuthenticated()) {
      this.setToken(this.token!);
    }
  }

  get token() {
    return sessionStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return this.token != null && !this.tokenHelper.isTokenExpired(this.token);
  }

  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  logout() {
    sessionStorage.removeItem('access_token');
  }
}
