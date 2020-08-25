// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
// @ts-ignore
import { SummaryService } from '../../../@core/utils/summary.service';
// @ts-ignore
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';


@Injectable({
  providedIn: 'any',
})
export class GetComponentServicesResolver implements Resolve <Observable<any>> {

  constructor(private ds: SummaryService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    const system = route.paramMap.get('system');
    if (system !== 'android' && system !== 'apk')
      return observableOf([]);
    const page = 1;
    return this.ds.getComponentServices(id, page).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
