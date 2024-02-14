import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url : string = "http://localhost:8080/api/user/"
  constructor(private  httpClinet: HttpClient) { }

  getMessage() : Observable<any>{
    return this.httpClinet.get<any>(this._url)
  }
}
