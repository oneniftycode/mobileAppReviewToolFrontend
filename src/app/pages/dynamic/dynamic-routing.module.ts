import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynComponent } from './dynamic.component';


export const routes: Routes = [
//  {
//    path: '',
//    component: DynamicMalwareComponent,
//    children: [
//      {
//        path: '',
//        component: DomainComponent,
//        resolve: {
//          domaineMalwareCheck: DomainResolver,
//        },
//
//      },
//      {
//        path: 'domain',
//        component: DomainComponent,
//        resolve: {
//          domaineMalwareCheck: DomainResolver,
//        },
//      },
//      {
//        path: 'antivirus',
//        component: AntivirusComponent,
//        resolve: {
//          antivirus: AntivirusResolver,
//        },
//      },
//      {
//        path: 'verdict',
//        component: VerdictComponent,
//        resolve: {
//          verdict: VerdictResolver,
//        },
//      },
//    ],
//  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynaModule {
}