import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {RegistrationDto} from "../models/user/registrationDto.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url : string = "http://localhost:8080/api/auth"
  constructor(private http : HttpClient) { }

  login(email: string , password: string): Observable<string> {
    return this.http.post<{ message: string }>(this._url + "/login", { email, password }).pipe(
      map(response => {
        const token = response.message;
        this.setToken(token);
        return token;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  register (user:RegistrationDto)  : Observable<string> {
    return this.http.post<{ message:string}>(this._url + "/register", user)
      .pipe(
        map(response => {
          const token = response.message;
          this.setToken(token);
          return token;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  cleanStorage(){
    localStorage.removeItem('token');
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }
}
