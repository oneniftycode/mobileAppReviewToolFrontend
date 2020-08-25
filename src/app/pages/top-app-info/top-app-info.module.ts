import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSidebarModule,
  NbLayoutModule,
  NbContextMenuModule,
  NbMenuModule,
  NbTooltipModule,
  NbWindowModule,

} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { TopAppInfoComponent } from './top-app-info.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    ThemeModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbLayoutModule,
    MatIconModule,
    NgxChartsModule,
    NbCardModule,
    NbMenuModule,
    RouterModule,
    NbTooltipModule,
    MatTableModule,
    CodemirrorModule,
    NbWindowModule.forChild(),
  ],
  exports: [
    TopAppInfoComponent,
  ],
  declarations: [
    TopAppInfoComponent,

  ],
})
export class TopAppInfoModule {
}
