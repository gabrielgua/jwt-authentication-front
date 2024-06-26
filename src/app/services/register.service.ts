import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../types/auth-response.type';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_AUTH_URL = `${environment.API_URL}/auth`;
  http = inject(HttpClient);

  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API_AUTH_URL}/register`, {name, email, password})
      .pipe(
        tap((res) => sessionStorage.setItem('access_token', res.access_token))
      );
  }
}
