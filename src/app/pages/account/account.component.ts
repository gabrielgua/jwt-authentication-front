import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../types/user-response.type';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService, private loginService: LoginService) {}

  user$ = new Observable<UserResponse>;

  ngOnInit(): void {
    this.userService.fetchUser();
    this.user$ = this.userService.getUser();
  }

  loaded(user: UserResponse) {
    return user.id != 0;
  }

  logout() {
    this.loginService.logout();

  }
}
