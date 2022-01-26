import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lake } from 'src/app/models/lake.model';
import { LakeList } from 'src/app/models/lakelist.model';
import {environment} from "../../environments/environment";

const baseUrl = environment.baseUrl + '/api/lake';

@Injectable({
  providedIn: 'root'
})
export class LakesService {

  constructor(private http: HttpClient) { }

  getLakes(page: any, page_size: any): Observable<LakeList> {
    return this.http.get<LakeList>(`${baseUrl}?page=${page}&page_size=${page_size}`);
  }

  get(id: any): Observable<Lake> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any[]> {
    return this.http.post<Lake[]>(`${baseUrl}/`, data,{withCredentials: true});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/`, data, {withCredentials: true});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,{withCredentials: true});
  }






}
