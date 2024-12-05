import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  
  getResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumescr/`);
  }

  createResume(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/resumescr/`, data);  
  }
  getResumeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumes/${id}/`);
  }

  updateResume(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/resumesm/${id}/`, data)
    
  }

  deleteResume(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/resumeslll/${id}/`);
  }
  

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.apiUrl}/languages/`);
  }
}