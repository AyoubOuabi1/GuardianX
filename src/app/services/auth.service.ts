import { Injectable } from '@angular/core';
import {User} from "../models/user/user.module";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";

export interface AuthResponseData {
  id : number,
  email : string,
  roles : string[],
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);
  _url : string = "http://localhost:8086/api/v1/auth/"
  constructor(private http : HttpClient,
              private router: Router) { }


  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this._url,
      {
        body : {email : email, password : password}
        },
      {
        withCredentials : true
        }
      ).pipe(
        catchError(error => {
          let errorMessage = 'An unknown error occurred!';
          if(error.error.message === 'Bad credentials') {
            errorMessage = 'The email address or password you entered is invalid'
          }
          return throwError(() =>  new Error(errorMessage))
        }) ,
        tap(user => {
          const extractedUser : User = {
            email: user.email,
            id: user.id,
            role : {
              name : user.roles.find(role => role.includes('ROLE')) || '',
              permissions : user.roles.filter(permission => !permission.includes('ROLE'))
            }
          }
           this.saveUserInLocalStorage(extractedUser);
           this.AuthenticatedUser$.next(extractedUser);
        })
      )
  }


  saveUserInLocalStorage(user : User): void {
    window.localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify({
          user
    }));
  }

  autoLogin() {
    const userData = this.getUserFromLocalStorage();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }
  getUserFromLocalStorage(): User | null {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  cleanStorage(): void {
    window.localStorage.clear();
  }

  logout(){
    this.http.post(this._url,{
      withCredentials: true
    }).subscribe({
      next: () => {
        this.cleanStorage();
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/login']);
      }
    })

  }

  refreshToken(){
    return this.http.post(`${this._url}/refresh-token`, {
      withCredentials: true
    })
  }
}
