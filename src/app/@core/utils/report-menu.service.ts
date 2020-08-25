import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';


@Injectable()
export class ReportMenuService {
  menuStatus: BehaviorSubject<string>;


  constructor() {
    this.menuStatus = new BehaviorSubject<string>("collapsed");
  }

  setValue(newValue): void {
    this.menuStatus.next(newValue);
  }
  getValue(): Observable<string> {
    return this.menuStatus.asObservable();
  }
}
