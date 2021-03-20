import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor() {}

  getLoadingObservable(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
