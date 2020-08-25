import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityComponent } from './security.component';
import { FileComponent } from './file/file.component';
import { CodeComponent } from './code/code.component';
import { BinaryComponent } from './binary/binary.component';
import { ManifestComponent } from './manifest/manifest.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ManifestResolver } from './manifest/manifest.resolver';
import { PermissionResolver } from './permissions/permissions.resolver';
import { CodeResolver } from './code/code.resolver';
import { FileResolver } from './file/file.resolver';
import { BinaryResolver } from './binary/binary.resolver';
import {AuthGuard} from '../../auth-guard.service';


export const routes: Routes = [
  {

    path: '',
    component: SecurityComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'manifest/:severity',
        canActivateChild: [AuthGuard],
        component: ManifestComponent,
        resolve: {
          manifestAnalysis: ManifestResolver,
        },
      },
      {
        path: 'ats/:severity',
        canActivateChild: [AuthGuard],
        component: ManifestComponent,
        resolve: {
          manifestAnalysis: ManifestResolver,
        },
      },
      {
        path: 'code/:severity',
        canActivateChild: [AuthGuard],
        component: CodeComponent,
        resolve: {
          codeAnalysis: CodeResolver,
        },
      },
      {
        path: 'file/:severity',
        canActivateChild: [AuthGuard],
        component: FileComponent,
        resolve: {
          fileAnalysis: FileResolver,
        },
      },

      {
        path: 'binary/:severity',
        canActivateChild: [AuthGuard],
        component: BinaryComponent,
        resolve: {
          binaryAnalysis: BinaryResolver,
        },
      },
      {
        path: 'permissions/:severity',
        canActivateChild: [AuthGuard],
        component: PermissionsComponent,
        resolve: {
          appPermissions: PermissionResolver,
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class SecurityRoutingModule {
}
