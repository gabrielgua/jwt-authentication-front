import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../types/auth-response.type';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_AUTH_URL = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API_AUTH_URL}/login`, {email, password})  
      .pipe(
        tap(response => {
          this.auth.setToken(response.access_token);
          this.router.navigate(['account']);
        })
      )
  }
}
