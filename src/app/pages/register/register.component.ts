import { Component, OnInit, inject } from '@angular/core';
import { DefaultLayoutComponent } from "../../components/default-layout/default-layout.component";
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../../validation/validation';
import { RegisterService } from '../../services/register.service';
import { AuthResponse } from '../../types/auth-response.type';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MessageComponent } from "../../components/message/message.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [DefaultLayoutComponent, PrimaryInputComponent, ReactiveFormsModule, MessageComponent]
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    error: boolean = false;
    errorMessage: string = '';

    success: boolean = false;
    successMessage: string = 'Your account was successfully created.';

    router = inject(Router);
    service = inject(RegisterService);

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required])
        },{
           validators: [Validation.match('password', 'confirmPassword')]
        });
    }

    get name() {
        return this.registerForm.get('name');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    isInvalid(control: AbstractControl): boolean {
        return control.dirty && control.invalid;
    }

    submit() {
        this.success = false;
        this.error = false;

        if (this.registerForm.invalid) {
            return;
        }


        this.service.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe({
            next: (res) => this.handleSuccess(res),
            error: (err) => this.handleError(err)
        })

        this.resetForm();
    }

    handleSuccess(res: AuthResponse) {
        this.success = true;
        console.log(res);
    }

    handleError(err: HttpErrorResponse) {

        switch(err.status) {
            case 0: this.errorMessage = 'The server may be offline, try again later.'; break;
            case 409: this.errorMessage = "This email is already registered."; break;
        }
        
        this.error = !!err;
    }

    resetForm() {
        this.registerForm.reset();
    }

    navigate() {
        this.router.navigate(['login'])
    }

    nameErrors(): string[] {
        return ['Name is required'];
    }

    emailErrors(): string[] {
        let errors = [];
        if (this.email?.errors?.['email']) {
            errors.push('Email must be a valid email');
        }

        if (this.email?.errors?.['required']) {
            errors.push('Email is required');
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
        if (this.confirmPassword?.errors?.['required']) {
          errors.push('Password is required.')
        }
    
        if (this.confirmPassword?.errors?.['differs']) {
          errors.push('Passwords do not match.')
        }
        return errors;
      }

}
