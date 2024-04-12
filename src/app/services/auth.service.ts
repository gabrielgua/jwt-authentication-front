import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenHelper: JwtHelperService) {}


  get token() {
    return sessionStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
     
    return !!this.token && !this.tokenHelper.isTokenExpired(this.token);
  }

  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }
}
