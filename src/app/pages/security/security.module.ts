import { NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {
  NbCardModule,
  NbTabsetModule,
  NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SecurityComponent } from './security.component';
import { TopAppInfoModule } from '../top-app-info/top-app-info.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SecurityService } from '../../@core/utils/security.service';
import { RecentScanService } from '../../@core/utils/recent-scans';
import { SecurityRoutingModule } from './security-routing.module';
import { FileComponent } from './file/file.component';
import { CodeComponent } from './code/code.component';
import { BinaryComponent } from './binary/binary.component';
import { ManifestComponent } from './manifest/manifest.component';
import { PermissionsComponent } from './permissions/permissions.component';
import {AuthGuard} from '../../auth-guard.service';

@NgModule({
  imports: [
    ThemeModule,
    TopAppInfoModule,
    MatIconModule,
    NbCardModule,
    NbTabsetModule,
    MatTableModule,
    NbSelectModule,
    RouterModule,
    NbDialogModule.forChild(),
    SecurityRoutingModule,

  ],
  declarations: [
    SecurityComponent,
    FileComponent,
    CodeComponent,
    BinaryComponent,
    ManifestComponent,
    PermissionsComponent,
  ],
  providers: [
    AuthGuard,
    SecurityService,
    RecentScanService,
  ],
})

export class SecurityModule {

}
