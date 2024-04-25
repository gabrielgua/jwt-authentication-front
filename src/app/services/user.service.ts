import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../types/user-response.type';
import { environment } from '../../environments/environment';

export interface UserState {
  user: UserInterface | undefined | null,
  loaded: boolean,
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USER_ULR = `${environment.API_URL}/users`
  private userSig = signal<UserInterface | undefined | null>(undefined);

  private state = signal<UserState>({
    user: undefined,
    loaded: false,
    error: null,
  });


  constructor(private http: HttpClient) { }

  getUser() {
    return this.state().user;
  }

  getState() {
    return this.state();
  }

  clearState() {
    this.state.set({user: undefined, error: null, loaded: false});
  }

  fetchUser() {
    return this.http.get<UserInterface>(`${this.API_USER_ULR}/my-info`)
      .subscribe({
        next: user => {
          this.state().user = user;
          this.state().loaded = true;
        },
        error: err => {
          this.state().error = err;
          this.state().loaded = true;
          console.log(err);
          
        }
      });
  }

  
}
