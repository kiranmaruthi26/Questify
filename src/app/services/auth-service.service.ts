// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private tokenKey = 'auth_token'; // Key to store token in localStorage
  private userName = '';
  private password = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = 'https://dev256816.service-now.com/api/now/table/x_1386907_questi_0_participant?sysparm_query=user_name%3D'+username+'&sysparm_fields=name%2Cuser_name%2Cemail%2Cmobile_phone%2Csys_id&sysparm_limit=1'; // Update API endpoint
    // const body = { username, password };

    const headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
          'Content-Type': 'application/json',
        });
    return this.http.get<any[]>(`${url}`, { headers });

    // return this.http.post<any>(url, body);
  }

  setToken(user_name: string, password:string): void {
    localStorage.setItem(this.userName, user_name);
    localStorage.setItem(this.password, password);
  }

  getToken(): any | null {

    return {'userName':localStorage.getItem(this.userName), 'password': localStorage.getItem(this.password)};
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.userName);
    localStorage.removeItem(this.password);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
