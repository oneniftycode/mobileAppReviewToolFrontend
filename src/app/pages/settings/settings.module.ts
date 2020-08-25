import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbSidebarModule,
  NbDatepickerModule,
  NbInputModule,
  NbMenuModule,
} from '@nebular/theme';
import {SettingsComponent} from './settings.component';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ColleaguesComponent } from './colleagues/colleagues.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountComponent,
    NotificationsComponent,
    IntegrationsComponent,
    ColleaguesComponent,
    TagsComponent,
    ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    NgbTimepickerModule,
    FormsModule,
    NbMenuModule,
  ],
})
export class SettingsModule { }
