import { Component } from '@angular/core';
import { DefaultLayoutComponent } from "../../components/default-layout/default-layout.component";
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../../validation/validation';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [DefaultLayoutComponent, PrimaryInputComponent, ReactiveFormsModule]
})
export class RegisterComponent {

    registerForm!: FormGroup;

    constructor(
        private router: Router,
    ) {
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
