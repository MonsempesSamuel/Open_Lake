import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisListComponent } from './analysis-list.component';

import { AnalysisService } from '../services/analysis.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('AnalysisListComponent', () => {
  let component: AnalysisListComponent;
  let fixture: ComponentFixture<AnalysisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisListComponent ],
      imports: [HttpClientModule],
      providers : [ HttpClient, AnalysisService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
