import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  url = `${environment.api}/currency`;

  constructor(private http: HttpClient) { }

  getList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.url}/list`);
  }

  create(data: Currency): Observable<Currency> {
    return this.http.post<Currency>(`${this.url}/create`, data);
  }

  edit(id: number, data: Currency): Observable<Currency> {
    return this.http.post<Currency>(`${this.url}/${id}`, data);
  }
}
