import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { take, map, catchError } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';

import { RecentScanService } from '../../../@core/utils/recent-scans';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'any',
})
export class RecentScanResolver implements Resolve <Observable<any>> {

  constructor(private ds: RecentScanService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ds.getRecentScans().pipe(
       catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
