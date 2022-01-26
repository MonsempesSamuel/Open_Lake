import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakeListComponent } from './lake-list.component';

import { LakesService } from 'src/app/services/lakes.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('LakeListComponent', () => {
  let component: LakeListComponent;
  let fixture: ComponentFixture<LakeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LakeListComponent ],
      imports: [HttpClientModule],
      providers: [HttpClient, AuthService, { provide: MatDialog, useValue:{} }, LakesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
