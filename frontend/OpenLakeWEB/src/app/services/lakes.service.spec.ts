import { TestBed } from '@angular/core/testing';

import { LakesService } from './lakes.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Injectable } from '@angular/core';


describe('LakesService', () => {
  let service: LakesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Injectable]
    });
    service = TestBed.inject(LakesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
