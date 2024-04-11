import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_AUTH_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.API_AUTH_URL}/login`, {email, password})  
      .pipe(
        tap(response => sessionStorage.setItem('access_token', response.accessToken))
      )
  }
}
