import { Routes } from '@angular/router';
import { AuthInitComponent } from './auth-init/auth-init.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthInitComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'otp',
    loadComponent: () => import('./otp/otp.component').then((c) => c.OtpComponent),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./forget-passwrod/forget-passwrod.component').then(
        (c) => c.ForgetPasswrodComponent
      ),
  },
  {
    path: 'new-password',
    loadComponent: () =>
      import('./new-password/new-password.component').then(
        (c) => c.NewPasswordComponent
      ),
  },
  // redirect
  // { path: '**', redirectTo:'login', pathMatch:'full' }
];
