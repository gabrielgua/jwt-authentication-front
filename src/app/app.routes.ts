import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, },
    {path: 'register', component: RegisterComponent },
    {path: 'account', component: AccountComponent, canActivate: [authGuard]},


    {path: '', redirectTo: 'account', pathMatch: 'full'}
];
