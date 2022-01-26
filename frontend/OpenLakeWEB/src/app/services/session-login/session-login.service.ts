import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionLoginService {
  LOGIN_URL = '/dj-rest-auth/login/';
  LOGOUT_URL = '/dj-rest-auth/logout/';
  DETAIL_URL = '/dj-rest-auth/user/';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(pUsername: string, pEmail: string, pPassword: string) {
    const loginData ={
      username: pUsername,
      email: pEmail,
      password: pPassword,
    };

    return new Observable<boolean>((observer) => {
      this.httpClient.post(environment.baseUrl + this.LOGIN_URL, loginData, {withCredentials: true}).subscribe(result => {
        observer.next(true);
        observer.complete();
      }, error => {
        observer.error(false);
        observer.complete();
      });
    });
  }
  logout() {
    return new Observable<boolean>((observer) => {
      this.httpClient.get(environment.baseUrl + this.LOGIN_URL, {withCredentials: true}).subscribe(result => {
        observer.next(true);
        observer.complete();
      }, error => {
        observer.error(false);
        observer.complete();
      });
    });
  }

  getinfo() {
    return this.httpClient.get(environment.baseUrl + this.DETAIL_URL, {withCredentials: true});
  }

}
