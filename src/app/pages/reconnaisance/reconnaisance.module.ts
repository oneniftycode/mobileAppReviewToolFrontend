import { NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
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
  NbDialogModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ReconnaisanceComponent } from './reconnaisance.component';
import { TopAppInfoModule } from '../top-app-info/top-app-info.module';
import {MatTableModule} from '@angular/material/table';
import { EmailComponent } from './email/email.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { StringComponent } from './string/string.component';
import { UrlsComponent } from './urls/urls.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ReconnaisanceRoutingModule } from "./reconnaisance-routing.module";
import { ReconnaissanceService } from '../../@core/utils/reconnaisance.service';

@NgModule({
  imports: [
    ThemeModule,
    TopAppInfoModule,
    MatIconModule,
    NbCardModule,
    NbTabsetModule,
    MatTableModule,
    NbSelectModule,
    ReconnaisanceRoutingModule,
    NbDialogModule.forChild(),


  ],
  declarations: [
    ReconnaisanceComponent,
    EmailComponent,
    FirebaseComponent,
    StringComponent,
    UrlsComponent,
    TrackerComponent,

  ],
  providers: [
    ReconnaissanceService
],
})

export class ReconnaisanceModule {

}
