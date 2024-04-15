import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../types/user-response.type';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USER_ULR = 'http://localhost:8080/users'
  private user$ = new BehaviorSubject<UserResponse>(new UserResponse());  

  constructor(private http: HttpClient) { 
    this.fetchUser();
  }

  public getUser() {
    return this.user$.asObservable();
  }

  fetchUser() {
    return this.http.get<UserResponse>(`${this.API_USER_ULR}/my-info`)
      .subscribe(user => this.user$.next(user));
  }
}
