import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _user_url : string = "http://localhost:8080/api/user"
  _admin_url : string = "http://localhost:8080/api/admin"
  constructor(private  httpClinet: HttpClient) { }

  getMessage() : Observable<any>{
    return this.httpClinet.get<any>(this._user_url)
  }
  getAdminMessage() : Observable<any>{
    return this.httpClinet.get<any>(this._admin_url)
  }
}
