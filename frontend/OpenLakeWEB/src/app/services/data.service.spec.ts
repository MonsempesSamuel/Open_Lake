import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Injectable } from '@angular/core';


describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Injectable]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
