import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
  NbTooltipModule,
  NbWindowModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { InteractifComponent } from './interactif.component';
import { TopAppInfoModule } from '../top-app-info/top-app-info.module';
import { MatTableModule } from '@angular/material/table';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { DynamicService } from '../../@core/utils/dynamic.service';
import { ScriptsService } from '../../@core/utils/scripts.service';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    TopAppInfoModule,
    MatIconModule,
    NbCardModule,
    NbTabsetModule,
    MatTableModule,
    NbSelectModule,
    NbTooltipModule,
    NbCheckboxModule,
    CodemirrorModule,
    NbWindowModule.forChild(),

  ],
  declarations: [
    InteractifComponent,

  ],
  providers: [
    DynamicService,
    ScriptsService,
  ],
})

export class InteractifModule {

}
