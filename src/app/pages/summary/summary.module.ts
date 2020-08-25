import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { CountryDomainsComponent } from './country-domains/country-domains.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RecentScanService } from '../../@core/utils/recent-scans';
import { SummaryService } from '../../@core/utils/summary.service';

import {
  NbCardModule,
  NbSelectModule,
  NbTooltipModule,
  NbWindowModule,

} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SummaryComponent } from './summary.component';
import { TopAppInfoModule } from '../top-app-info/top-app-info.module';

@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
    NbWindowModule.forChild(),
    MatIconModule,
    NbCardModule,
    LeafletModule,
    NgxEchartsModule,
    NgxChartsModule,
    TopAppInfoModule,
    MatTableModule,
    NbTooltipModule,
    NbSelectModule,

  ],
  declarations: [
    SummaryComponent,
    CountryDomainsComponent,
  ],
  providers: [
    RecentScanService,
    SummaryService,
  ],
})
export class SummaryModule {
}
