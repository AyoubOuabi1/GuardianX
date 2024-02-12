import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorHandlerInterInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Forbidden error occurred:', error);
        } else if (error.status === 404) {
          console.error('Not Found error occurred:', error);
        } else if (error.status ===400){
          console.error('A validation error occurred:', error);
        }else {
          console.error('An unexpected error occurred:', error);
        }
        return throwError(error);
      })
    )
  }
}

