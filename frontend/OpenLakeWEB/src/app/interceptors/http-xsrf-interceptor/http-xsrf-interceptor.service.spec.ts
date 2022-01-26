import { TestBed } from '@angular/core/testing';

import { HttpXsrfInterceptorService } from './http-xsrf-interceptor.service';

import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpXsrfTokenExtractor} from "@angular/common/http";

describe('HttpXsrfInterceptorService', () => {
  let service: HttpXsrfInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, { provide: HttpRequest, useValue:{} }, HttpXsrfTokenExtractor, Injectable]
    });
    service = TestBed.inject(HttpXsrfInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
