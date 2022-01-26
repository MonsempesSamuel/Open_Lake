import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Injectable } from '@angular/core';

import { SessionLoginService } from './session-login.service';

describe('SessionLoginService', () => {
  let service: SessionLoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, Injectable]
    });
    service = TestBed.inject(SessionLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
