import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakeAddComponent } from './lake-add.component';

import { LakesService } from 'src/app/services/lakes.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { MatDialogRef } from '@angular/material/dialog';

describe('LakeAddComponent', () => {
  let component: LakeAddComponent;
  let fixture: ComponentFixture<LakeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LakeAddComponent ],
      providers: [ LakesService, HttpClient, { provide: MatDialogRef, useValue: {} } ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LakeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
