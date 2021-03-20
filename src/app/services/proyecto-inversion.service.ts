import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProyectoInversion } from '../interfaces/proyecto-inversion';

@Injectable({
  providedIn: 'root'
})
export class ProyectoInversionService {

  url = `${environment.api}/proyecto_inversion`;

  constructor(private http: HttpClient) { }

  getList(): Observable<ProyectoInversion[]> {
    return this.http.get<ProyectoInversion[]>(`${this.url}`);
  }

  detail(id: number): Observable<ProyectoInversion> {
    return this.http.get<ProyectoInversion>(`${this.url}/${id}/detalle`);
  }
}
