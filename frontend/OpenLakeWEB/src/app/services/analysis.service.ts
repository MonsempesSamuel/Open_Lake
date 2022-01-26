import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analysis } from '../models/analysis.model';
import { AnalysisList } from 'src/app/models/analysislist.model';
import {environment} from "../../environments/environment";

const baseUrl = environment.baseUrl + '/api/analysis'

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Analysis[]> {
    return this.http.get<Analysis[]>(baseUrl);
  }

  getAnalysis(page: any, page_size: any, lake_id: any): Observable<AnalysisList> {
    return this.http.get<AnalysisList>(`${baseUrl}/?page=${page}&page_size=${page_size}&lake_id=${lake_id}`);
  }

  get(id: any): Observable<Analysis> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any[]> {
    return this.http.post<Analysis[]>(`${baseUrl}/`, data, {withCredentials: true});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/`, data,{withCredentials: true});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,{withCredentials: true});
  }

}
