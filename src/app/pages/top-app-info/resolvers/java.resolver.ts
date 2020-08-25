import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportTopInfoService } from '../../../@core/utils/report-top-info';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'any',
})
export class GetJavaResolver implements Resolve<Observable<any>> {
  constructor(private ds: ReportTopInfoService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    const system = route.paramMap.get('system');
    if (system !== 'android' && system !== 'apk')
      return observableOf([]);
    return this.ds.getJava(id, system).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
