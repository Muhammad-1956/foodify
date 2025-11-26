import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('userToken');
    const isFormData = req.body instanceof FormData;

    // URLs with NO token
    const noAuthUrls = ['login', 'register', 'verify-otp', 'resend-verify-otp'];

    const isNoAuth = noAuthUrls.some(url => req.url.includes(url));

    // Build full URL
    const apiUrl = req.url.startsWith('http')
      ? req.url
      : environment.apiBaseUrl + req.url;

    const headers: Record<string, string> = {};

    // No Authorization for auth routes
    if (!isNoAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // DO NOT set content-type for FormData
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const modifiedReq = req.clone({
      url: apiUrl,
      setHeaders: headers
    });

    return next.handle(modifiedReq);
  }
}
