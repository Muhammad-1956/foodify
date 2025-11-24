import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

// ✅ Import provideHttpClient and optional helpers
import { provideHttpClient, withJsonpSupport, withRequestsMadeViaParent } from '@angular/common/http';
// import { AuthInterceptor } from './core/interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withJsonpSupport(), // Optional
      // { interceptors: [AuthInterceptor] } // Add your interceptor
    ),

    // provideAnimations(), // if using Angular animations

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
