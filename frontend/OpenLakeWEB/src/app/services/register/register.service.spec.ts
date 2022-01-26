import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Injectable } from '@angular/core';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Injectable]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
