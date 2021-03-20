import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  getList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }

  getUserName(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}?username=${username}`);
  }

  changePass(userId: number, data: any): Observable<User> {
    return this.http.post<User>(`${this.url}/${userId}/password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/reset-password`, data);
  }

  forgotPass(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/forgot-password?username=${username}`);
  }

  adminCreateUser(data: User): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, data);
  }

  adminEditUser(userId: number, data: User): Observable<any> {
    return this.http.post<any>(`${this.url}/${userId}/from-admin`, data);
  }

  changeStatus(userId: number, status: string): Observable<any> {
    return this.http.post<User>(`${this.url}/${userId}/change-status`, { status });
  }
}
