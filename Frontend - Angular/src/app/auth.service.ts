import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, credentials);
  }
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout/`, {});
  }
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-info/`);
}
isConnected(): Observable<any> {
  return this.http.get(`${this.baseUrl}/is_connected/`);
}
getUsernames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/usernames/`);
}
getUserType(): Observable<any> {
  return this.http.get(`${this.baseUrl}/user-type/`);
}
getMbti(): Observable<any> {
  return this.http.get(`${this.baseUrl}/getMbti/`);
}
getBig5(): Observable<any> {
  return this.http.get(`${this.baseUrl}/getBig5/`);
}
saveJobU(jobU: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/jobUsave/`, jobU);
}
getJobById(id: number): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/getJobsbyid/${id}/`);
}
testJobById(id: number): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/testJobsbyid/${id}/`);
}
}
