import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { HttpErrorService } from '../services/http-error.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
        }
        let errors = [];
        if (err.error) {
          if (err.status === 0) {
            errors = [
              'No tiene acceso al servidor, por favor verifique su conexión',
            ];
          } else if (err.error instanceof Array) {
            errors = err.error.map((e) =>
              e.error ? e.error : 'Ocurrió un error'
            );
          } else if (err.status === 404 && !err?.error?.error) {
            errors = ['Error 404: No existe el recurso en el servidor'];
          }  else if (err.status === 401 && err?.error?.error === 'Unauthorized') {
            errors = ['Su sesión a expirado, por favor vuelva a ingresar'];
          }else {
            errors = [
              err.error.error || err.error.message || err.statusText || err.error.toString(),
            ];
          }
        } else {
          errors = [err.message || err.statusText || err.toString()];
        }
        this.httpErrorService.setErrorList(errors);
        return throwError(errors);
      })
    );
  }
}
