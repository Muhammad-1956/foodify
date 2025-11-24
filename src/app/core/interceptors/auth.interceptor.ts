// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // 1️⃣ Clone the request to add headers
//     const clonedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${localStorage.getItem('token') || ''}`
//       }
//     });

//     // 2️⃣ Pass the request to the next handler
//     return next.handle(clonedReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('HTTP Error:', error);
//         // Handle specific status codes if needed
//         if (error.status === 401) {
//           // e.g., redirect to login
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }
