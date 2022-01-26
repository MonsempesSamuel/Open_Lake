import { TestBed } from '@angular/core/testing';

import { AnalysisService } from './analysis.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Injectable } from '@angular/core';


describe('AnalysisService', () => {
  let service: AnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Injectable]
    });
    service = TestBed.inject(AnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
