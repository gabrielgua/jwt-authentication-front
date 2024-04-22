import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { MessageComponent } from "../../components/message/message.component";
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { AuthResponse } from '../../types/auth-response.type';

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
  error: boolean = false;

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
    this.error = false;

    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (err) => this.handleError(err)
    }); 
    
    this.resetForm();
  }


  private handleSuccess(response: AuthResponse) {
    console.log('Login feito com sucesso');
    console.log(response);    
  }

  private handleError(err: Error) {
    this.error = !!err;
    this.resetForm();
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
