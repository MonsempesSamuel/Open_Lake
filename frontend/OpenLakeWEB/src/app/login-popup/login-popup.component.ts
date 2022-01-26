import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SessionLoginService} from "../services/session-login/session-login.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {  MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  wrongCredentials = false;

  constructor(
    private sessionLogin: SessionLoginService,
    private router: Router,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();


  login() {
    this.wrongCredentials = false;
    this.sessionLogin.login(this.username, this.email, this.password).subscribe(result =>{
      this.authService.signIn()
      this.dialogRef.close();
    },error => {
      this.wrongCredentials = true;
    });

  }

  }
