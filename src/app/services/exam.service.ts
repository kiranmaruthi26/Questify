// exam.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'https://dev256816.service-now.com/api/';
  private username = 'integration.web';
  private password = '*6OXtzsuqnR>IB;YlATAO]MTz1eU[K!_U9V;2#9v<k:HJ4!5;0:q4WijM>efPLd}{zP2?Pz(1+8$Nx5b%73K,(UfJmZ=JnY_D,#O';

  constructor(private http: HttpClient) {}

  getActiveExams(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.apiUrl}now/table/x_1386907_questi_0_exams?sysparm_query=active=true`, { headers });
  }

  fetchQuestions(examID:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}x_1386907_questi_0/fetchexampaper/questions?sys_id=`+examID, {headers});
  }

  submitResponses(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}submit-responses`, payload);
  }
}
