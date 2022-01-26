import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  REGISTER_URL = '/dj-rest-auth/registration/';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(pUsername: string, pEmail: string, pPassword1: string, pPassword2: string,) {
    const registerData ={
      username: pUsername,
      email: pEmail,
      password1: pPassword1,
      password2: pPassword2,
    };
    return new Observable<boolean>((observer) => {
      this.httpClient.post(environment.baseUrl + this.REGISTER_URL, registerData, {withCredentials: true}).subscribe(result => {
        observer.next(true);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
