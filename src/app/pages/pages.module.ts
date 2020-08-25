import { NgModule } from '@angular/core';
import { NbMenuModule, NbRouteTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { SummaryModule } from './summary/summary.module';
import { HomeModule } from './home/home.module';
import { SecurityModule } from './security/security.module';
import { ReconnaisanceModule } from './reconnaisance/reconnaisance.module';
import { SupportModule } from './support/support.module';
import { AboutModule } from './about/about.module';
import { ApiModule } from './api/api.module';
import { MalwareModule } from './malware/malware.module';
import { InteractifModule } from './interactif/interactif.module';
import { ComponentsModule } from './components/components.module';
import { TopAppInfoModule } from './top-app-info/top-app-info.module';
import { TopAppInfoComponent } from './top-app-info/top-app-info.component';
import { ReportMenuService } from '../@core/utils/report-menu.service';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ReportTopInfoService } from '../@core/utils/report-top-info';
import {AuthGuard} from '../auth-guard.service';
import { DynModule } from './dynamic/dynamic.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    InteractifModule,
    SummaryModule,
    SecurityModule,
    ReconnaisanceModule,
    HomeModule,
    MiscellaneousModule,
    NbRouteTabsetModule,
    SupportModule,
    ComponentsModule,
    ApiModule,
    TopAppInfoModule,
    MalwareModule,
    DynModule,
  ],
  declarations: [
    PagesComponent,
  ],
  exports: [
    TopAppInfoComponent,
  ],
  providers: [
    ReportTopInfoService,
    ReportMenuService,
    AuthGuard,
  ],
})
export class PagesModule {
}
