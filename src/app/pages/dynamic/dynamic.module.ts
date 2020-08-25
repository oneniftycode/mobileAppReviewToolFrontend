import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TopAppInfoModule } from '../top-app-info/top-app-info.module';

import {
  NbCardModule,
  NbTabsetModule,
  NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MatTableModule } from '@angular/material/table';
import { AuthGuard } from "../../auth-guard.service";
import { DynComponent } from "./dynamic.component"
import { DynaModule } from "./dynamic-routing.module"

@NgModule({
  imports: [
    ThemeModule,
    TopAppInfoModule,
    MatIconModule,
    NbCardModule,
    NbTabsetModule,
    MatTableModule,
    NbSelectModule,
    DynaModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    DynComponent
  ],
  providers: [
    AuthGuard,
  ],
})
export class DynModule {

}