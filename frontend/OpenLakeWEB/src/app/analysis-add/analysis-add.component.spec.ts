import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisAddComponent } from './analysis-add.component';

import { AnalysisService } from '../services/analysis.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Inject } from '@angular/core';

describe('AnalysisAddComponent', () => {
  let component: AnalysisAddComponent;
  let fixture: ComponentFixture<AnalysisAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisAddComponent ],
      imports: [HttpClientModule],
      providers: [HttpClient, { provide: MatDialogRef, useValue:{} }, { provide: MAT_DIALOG_DATA, useValue:{} }, AnalysisService, Inject]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
