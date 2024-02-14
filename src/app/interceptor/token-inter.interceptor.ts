import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponseDto} from "../models/user/responseDto.module";

@Injectable()
export class TokenInterInterceptor implements HttpInterceptor {

  constructor() {}
  responseString : string | null = localStorage.getItem('user');

  response: ResponseDto = this.responseString ? JSON.parse(this.responseString) : {};

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.response)
    if (this.response.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.response.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
