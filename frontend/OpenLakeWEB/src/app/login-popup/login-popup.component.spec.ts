import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupComponent } from './login-popup.component';

import {SessionLoginService} from "../services/session-login/session-login.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { MatDialogRef } from '@angular/material/dialog';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('LoginPopupComponent', () => {
  let component: LoginPopupComponent;
  let fixture: ComponentFixture<LoginPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPopupComponent ],
      imports: [HttpClientModule],
      providers: [HttpClient, AuthService, { provide: Router, useValue: {} }, { provide: MatDialogRef, useValue: {} }, SessionLoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
