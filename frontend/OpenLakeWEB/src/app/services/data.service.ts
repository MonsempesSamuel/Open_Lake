import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/data.model';
import { DatasList } from 'src/app/models/dataslist.model';
import {environment} from "../../environments/environment";


const baseUrl = environment.baseUrl + '/api/data';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Data[]> {
    var response = this.http.get<Data[]>(baseUrl);
    return response;
  }

  getDatas(page: any, page_size: any, data_id: any): Observable<DatasList> {
    return this.http.get<DatasList>(`${baseUrl}/?page=${page}&page_size=${page_size}&analysis_id=${data_id}`);
  }

  get(id: any): Observable<Data> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any[]> {
    return this.http.post<Data[]>(`${baseUrl}/`, data, {withCredentials: true});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/`, data, {withCredentials: true});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, {withCredentials: true});
  }

}
