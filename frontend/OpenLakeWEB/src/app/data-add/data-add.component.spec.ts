import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddComponent } from './data-add.component';

import { DataService } from '../services/data.service';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {HttpClient, HttpClientModule} from "@angular/common/http";


describe('DataAddComponent', () => {
  let component: DataAddComponent;
  let fixture: ComponentFixture<DataAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAddComponent ],
      imports: [HttpClientModule],
      providers : [ { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }, DataService, HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
