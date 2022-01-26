import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPopupComponent } from './logout-popup.component';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AuthService } from 'src/app/services/auth.service';

describe('LogoutPopupComponent', () => {
  let component: LogoutPopupComponent;
  let fixture: ComponentFixture<LogoutPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutPopupComponent ],
      imports: [HttpClientModule],
      providers: [HttpClient, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
