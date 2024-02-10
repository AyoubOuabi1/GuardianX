import { Injectable } from '@angular/core';
import {User} from "../models/user/user.module";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Role} from "../models/user/role.module";

export interface AuthResponseData {
  id : number,
  email : string,
  role : Role,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);
  _url : string = "http://localhost:8080/api/v1/auth"
  constructor(private http : HttpClient,
              private router: Router) { }


  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`http://localhost:8080/api/v1/auth/authenticate`,
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
          console.log(user)
          const extractedUser : User = {
            email: user.email,
            id: user.id,
            role : user.role
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
