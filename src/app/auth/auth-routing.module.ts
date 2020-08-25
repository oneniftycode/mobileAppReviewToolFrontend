import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxAuthComponent } from './auth.component';
import {
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  {

    path: '',
    component: NgxAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
      {
        path: 'logout',
        // component: NbLogoutComponent,
        component: NgxLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      }, {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
