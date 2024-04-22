import { Component, OnInit, inject } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  loginService = inject(LoginService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.fetchUser();
  }

  logout() {
    this.loginService.logout();
  }

  loading() {
    return !this.userService.getState().loaded;
  }

  isError() {
    return !!this.userService.getState().error;
  }
}
