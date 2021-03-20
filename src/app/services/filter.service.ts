import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterObservable = new BehaviorSubject<string>('') ;
  private showfilter = false;

  constructor() {  }

  set filter(val: string) {
    this.filterObservable.next(val);
  }

  get filter(): string {
    return this.filterObservable.value;
  }

  observable(): Observable<string> {
    return this.filterObservable.asObservable();
  }

  setShowFilter(showFilterValue: boolean): void {
    this.showfilter = showFilterValue;
  }

  getShowFilter(): boolean {
    return this.showfilter;
  }
}
