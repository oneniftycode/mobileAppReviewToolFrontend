import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { DynamicService } from '../../@core/utils/dynamic.service';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/observable/of'

@Injectable({
  providedIn: 'any'
})
export class InteractifResolver implements Resolve <Observable<any>>{

  constructor(private ds: DynamicService) { }
  //
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let id = route.paramMap.get('id')? route.paramMap.get('id') : route.parent.paramMap.get('id')
    let system = route.paramMap.get('system')? route.paramMap.get('system') : route.parent.paramMap.get('system')

    return this.ds.init(id,system).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        return observableOf([]);
      })
    );
  }
}
