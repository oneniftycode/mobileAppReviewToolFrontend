import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SummaryService} from '../../../@core/utils/summary.service';
import { take, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'any',
})
export class GetComponentReceiversResolver implements Resolve <Observable<any>> {

  constructor(private ds: SummaryService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    const system = route.paramMap.get('system');
    if (system !== 'android' && system !== 'apk')
      return observableOf([]);
    const page = 1;
    return this.ds.getComponentReceivers(id, page).pipe(
            catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
