import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SessionLoginService} from "../services/session-login/session-login.service";
import {RegisterService} from "../services/register/register.service";
import {AuthService} from "../services/auth.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.scss']
})
export class RegisterPopupComponent implements OnInit {
  username = '';
  email = '';
  password1 = '';
  password2 = '';
  wrongCredentials = false;
  errorusername = '';
  erroremail = '';
  errorpassword1 = '';
  errorpassword2 = '';

  constructor(
    private registerService: RegisterService,
    public dialogRef: MatDialogRef<any>,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {

  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  register() {
    this.wrongCredentials = false;
    this.registerService.register(this.username, this.email, this.password1, this.password2,).subscribe(result => {
      this.authService.signIn()
      this.dialogRef.close();
    }, error => {
      console.log(error.error)
      this.errorusername = (error.error.username)? error.error.username[0] :'';
      this.erroremail = (error.error.email)? error.error.email[0] :'';
      this.errorpassword1 = (error.error.password1)? error.error.password1[0] :'';
      this.errorpassword2 = (error.error.password2)? error.error.password2[0] :'';
      this.wrongCredentials = true;
    });
  }

}
