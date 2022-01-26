import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';

import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { MatDialog } from '@angular/material/dialog';
import { LakesService } from 'src/app/services/lakes.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarComponent ],
      imports: [HttpClientModule, MatAutocompleteModule, MatMenuModule],
      providers: [HttpClient, { provide: Router, useValue:{} }, AuthService, { provide: MatDialog, useValue:{} }, LakesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
