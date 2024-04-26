import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { MessageClass, MessageComponent } from "../../components/message/message.component";
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { AuthResponse } from '../../types/auth-response.type';
import { HttpErrorResponse } from '@angular/common/http';

export interface Feedback {
  show: boolean;
  type: MessageClass;
  message: string;
}

@Component({
    selector: 'app-login',
    standalone: true,
    providers: [LoginService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        DefaultLayoutComponent,
        PrimaryInputComponent,
        ReactiveFormsModule,
        MessageComponent,
    ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  feedback: Feedback = {
    message: '',
    type: 'error',
    show: false,
  }
  loading = false;

  router = inject(Router);
  service = inject(LoginService);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    this.resetFeedback();

    if (this.loginForm.invalid) {
      return;
    }

    this.setIsLoading(true);
    this.service.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (err) => this.handleError(err),
    }); 
    
    this.resetForm();
  }


  private resetFeedback() {
    this.feedback = {show: false, type: 'error', message: ''};
  }

  private setShow(show: boolean) {
    this.feedback.show = show;
  }

  private setMessage(message: string) {
    this.feedback.message = message;
  }

  private setType(type: MessageClass) {
    this.feedback.type = type;
  }

  private setIsLoading(loading: boolean) {
    this.loading = loading;
  }


  private handleSuccess(response: AuthResponse) {
    this.setIsLoading(false);
    console.log('Login feito com sucesso');
  }

  private handleError(err: HttpErrorResponse) {

    switch(err.status) {
        case 0: 
          this.setMessage('The server may be offline, try again later.');
          break;
        case 409: 
          this.setMessage('This email is already registered.'); 
          break;
        case 401: 
          this.setMessage('The password and/or email are invalid.');     
          break;
        default: 
          this.setMessage('The server is waking up, try again in a few seconds.');
          this.setType('info');
          break;
    }
    
    this.setIsLoading(false);
    this.setShow(!!err);
}

  private resetForm() {
    this.password?.reset();
  }

  navigate() {
    this.router.navigate(['register']);
  }

  isInvalid(control: AbstractControl):boolean {
    return control.dirty && control.invalid;
  }

  emailErrors(): string[] {
    let errors = [];
    if (this.email?.errors?.['required']) {
      errors.push('Email is required');
    }
    if (this.email?.errors?.['email']) {
      errors.push('Email must be a valid email')
    }
    return errors;
  }

  passwordErrors(): string[] {
    let errors = [];
    if (this.password?.errors?.['required']) {
      errors.push('Password is required.')
    }

    if (this.password?.errors?.['minlength']) {
      errors.push('Password has to be greater than 6 characters.')
    }

    return errors;
  }

  confirmPasswordErrors(): string[] {
    let errors = [];
    if (this.password?.errors?.['required']) {
      errors.push('Password is required.')
    }

    if (this.password?.errors?.['differs']) {
      errors.push('Passwords do not match.')
    }
    return errors;
  }


}
