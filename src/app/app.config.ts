import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

// ✅ Import provideHttpClient and optional helpers
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors, withJsonpSupport, withRequestsMadeViaParent } from '@angular/common/http';
import { environment } from './core/environment/environment';
// import { AuthInterceptor } from './core/interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpBaseInterceptorFn]),
      withJsonpSupport(), // Optional
      // { interceptors: [AuthInterceptor] } // Add your interceptor
    ),

    // provideAnimations(), // if using Angular animations
    provideToastr(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true
    })
  ]
};
export function httpBaseInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn) {
  const token = localStorage.getItem('userToken');
  const isFormData = req.body instanceof FormData;

  // URLs that should NOT have token
  const noAuthUrls = ['login', 'register', 'forgot-password'];

  const isNoAuth = noAuthUrls.some(url => req.url.includes(url));

  const url = req.url.startsWith('http')
    ? req.url
    : environment.apiBaseUrl + req.url;

  const headers: Record<string, string> = {};

  // ❌ Do NOT add token on register/login
  if (!isNoAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // ❌ Do NOT set JSON headers for FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const modifiedReq = req.clone({
    url,
    setHeaders: headers
  });

  return next(modifiedReq);
}
