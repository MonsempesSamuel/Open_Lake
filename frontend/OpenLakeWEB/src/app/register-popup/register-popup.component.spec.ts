import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPopupComponent } from './register-popup.component';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";

import {RegisterService} from "../services/register/register.service";
import {AuthService} from "../services/auth.service";

describe('RegisterPopupComponent', () => {
  let component: RegisterPopupComponent;
  let fixture: ComponentFixture<RegisterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPopupComponent ],
      imports: [HttpClientModule],
      providers: [HttpClient, { provide: MatDialogRef, useValue:{} }, RegisterService, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
