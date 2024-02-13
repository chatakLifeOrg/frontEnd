import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private height: BehaviorSubject<string> = new BehaviorSubject('')
  public height$ = this.height.asObservable()
  constructor() { }

  async setWidth(height: string) {
    console.log('in the service',);
    this.height.next(height);
  }
}
