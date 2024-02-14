import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {RegistrationDto} from "../models/user/registrationDto.module";
import {ResponseDto} from "../models/user/responseDto.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url : string = "http://localhost:8080/api/auth"
  constructor(private http : HttpClient) { }

  login(email: string, password: string): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this._url + "/login", { email, password }).pipe(
      map(response => {
        this.saveToLocalStorage(response);
        return response;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  register(user: RegistrationDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this._url + "/register", user).pipe(
      map(response => {
        this.saveToLocalStorage(response);
        return response;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  cleanStorage(){
    localStorage.removeItem('user');
  }

  saveToLocalStorage(response: ResponseDto) {
    localStorage.setItem('user', JSON.stringify(response));
  }
}
