import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'https://your-service-now-api-url.com/api/activeExams';

  constructor(private http: HttpClient) {}

  getActiveExams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
