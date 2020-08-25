import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canLoad(route: Route) {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            console.log('authguard == ', this.authService.isAuthenticated());
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            console.log('authguard == ', this.authService.isAuthenticated());
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }
}

