import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxAuthComponent } from './auth.component';
import { NgxAuthRoutingModule } from './auth-routing.module';

import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
  NbLayoutModule,
  NbIconModule,
  NbMenuModule,

} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbAuthModule,
    NbIconModule,
    NbMenuModule,
    NgxAuthRoutingModule,
  ],
  declarations: [
    NgxAuthComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
    NgxLogoutComponent,
    // ... here goes our new components
  ],
})
export class NgxAuthModule {
}
