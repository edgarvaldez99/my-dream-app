import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Authentication } from '../interfaces/authentication';
import { User } from '../interfaces/user';
import { AUTH_KEY, TOKEN_KEY } from '../contanst';

const authItem = localStorage.getItem(AUTH_KEY);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.api}/login`;
  private authenticationSubject = new BehaviorSubject<Authentication | undefined>(JSON.parse(authItem ? authItem : '{}'));

  constructor(private router: Router, private http: HttpClient) {}

  get authentication(): Observable<Authentication | undefined> {
    return this.authenticationSubject.asObservable();
  }

  get authenticationValue(): Authentication | undefined {
    return this.authenticationSubject.value;
  }

  get token(): string | undefined {
    return this.authenticationValue?.token;
  }

  get isAuthenticated(): boolean {
    return !!this.authenticationValue;
  }

  getLoggedUserObservable(): Observable<User | undefined> {
    return this.authentication.pipe(map(auth => auth?.user));
  }

  login(username: string, password: string): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.baseUrl}`, { username, password })
      .pipe(map(auth => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
        localStorage.setItem(TOKEN_KEY, auth.token);
        this.authenticationSubject.next(auth);
        return auth;
      }));
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
    this.authenticationSubject.next(undefined);
    this.router.navigate(['/login']);
  }

  loggedUser(): User | undefined {
    return this.authenticationValue?.user;
  }

  loggedUserHasRole(role: string): boolean {
    const user = this.loggedUser();
    if (user) {
      return user.role === role ? true : false;
    }
    return false;
  }
}
