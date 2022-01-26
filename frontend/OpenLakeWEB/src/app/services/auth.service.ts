import { Injectable } from '@angular/core';
import {SessionLoginService} from "../services/session-login/session-login.service";
import { Details } from 'src/app/models/userdetails.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private sessionLogin: SessionLoginService
  ) { }


  isAuth = false;
  isAdmin = false;
  details : Details = {};

  signIn() {
    this.isAuth = true;
    this.isAdmin = true;
    this.sessionLogin.getinfo().subscribe(result =>{
      this.details = result;
    });
  }

  signOut() {
    this.isAuth = false;
    this.isAdmin = false;
    this.details = {};
  }
}
