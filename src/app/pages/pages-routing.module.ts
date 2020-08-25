import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth-guard.service';

import { PagesComponent } from './pages.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { RecentScanResolver } from './home/recent-scan/recent-scan.resolver';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentsComponent } from './components/components.component';
import { InteractifComponent } from './interactif/interactif.component';
import { AppInfoResolver } from './top-app-info/resolvers/appinfo.resolver';
import { AppStoreInfoResolver } from './top-app-info/resolvers/appstore.resolver';
import { SignerCertificateResolver } from './top-app-info/resolvers/signer.resolver';
import { SecurityOverviewResolver } from './summary/resolvers/securityOverview.resolver';
import { CountryDomainsResolver } from './summary/resolvers/countryDomain.resolver';
import { GetJavaResolver } from './top-app-info/resolvers/java.resolver';
import { GetSamaliResolver } from './top-app-info/resolvers/samali.resolver';
import { ManifestResolver } from './top-app-info/resolvers/manifest.resolver';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { GetComponentActivitiesResolver } from './summary/resolvers/componentActivities.resolver';
import { GetComponentServicesResolver } from './summary/resolvers/componentServices.resolver';
import { GetComponentReceiversResolver } from './summary/resolvers/componentReceivers.resolver';
import { GetComponentProvidersResolver } from './summary/resolvers/componentProviders.resolver';
import { ApkidResolver } from './malware/apkid/apkid.resolver';
import { AndroidJavaApiResolver } from './malware/javaApi/javaApi.resolver';
import { DomainResolver } from './malware/domain/domain.resolver';
import { BrowsableActivitiesResolver } from './malware/activities/activities.resolver';
import {MalwareOverviewResolver} from './summary/resolvers/malwareoverview.resolver';
import { InteractifResolver } from './interactif/interactif.resolver';
import { DynComponent } from './dynamic/dynamic.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'home',
      component: HomeComponent,
      canActivateChild: [AuthGuard],
      resolve: {
        recentScan: RecentScanResolver,
      },
    },
    {
      path: 'summary/:id/:system',
      component: SummaryComponent,
      canActivateChild: [AuthGuard],
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        securityOverview: SecurityOverviewResolver,
        malwareOverview: MalwareOverviewResolver,
        domainAnalysis: CountryDomainsResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        getComponentsActivities: GetComponentActivitiesResolver,
        getComponentsServices: GetComponentServicesResolver,
        getComponentsReceivers: GetComponentReceiversResolver,
        getComponentsProviders: GetComponentProvidersResolver,
      },
    },
    {
      path: 'security/:id/:system',
      canLoad: [AuthGuard],
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        securityOverview: SecurityOverviewResolver,

      },
    },
    {
      path: 'reconnaisance/:id/:system',
      canLoad: [AuthGuard],
      loadChildren: () => import('./reconnaisance/reconnaisance.module')
        .then(m => m.ReconnaisanceModule),
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
      },
    },
    {
      path: 'malware/:id/:system',
      canLoad: [AuthGuard],
      loadChildren: () => import('./malware/malware.module')
        .then(m => m.MalwareModule),
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        malwareOverview: MalwareOverviewResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        apkidResolver: ApkidResolver,
        androidJavaApiResolver: AndroidJavaApiResolver,
        domainResolver: DomainResolver,
        browsableActivitiesResolver: BrowsableActivitiesResolver,

      },
    },
    {
      path: 'components/:id/:system',
      canActivateChild: [AuthGuard],
      component: ComponentsComponent,
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        getComponentsActivities: GetComponentActivitiesResolver,
        getComponentsServices: GetComponentServicesResolver,
        getComponentsReceivers: GetComponentReceiversResolver,
        getComponentsProviders: GetComponentProvidersResolver,
      },
    },
    {
      path: 'interactif/:id/:system',
      component: InteractifComponent,
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        init: InteractifResolver,
      },
    },
    {
      path: 'malware/:id/:system',
      loadChildren: () => import('./malware-dyc/malware.module')
        .then(m => m.DynamicMalwareModule),
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        malwareOverview: MalwareOverviewResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        apkidResolver: ApkidResolver,
        androidJavaApiResolver: AndroidJavaApiResolver,
        domainResolver: DomainResolver,
        browsableActivitiesResolver: BrowsableActivitiesResolver,

      },
    },
    {
      path: 'dynamic_malware/:id/:system',
      loadChildren: () => import('./malware-dyc/malware.module')
        .then(m => m.DynamicMalwareModule),
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        malwareOverview: MalwareOverviewResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        apkidResolver: ApkidResolver,
        androidJavaApiResolver: AndroidJavaApiResolver,
        domainResolver: DomainResolver,
        browsableActivitiesResolver: BrowsableActivitiesResolver,

      },
    },
    {
      path: 'dynamic_report/:id/:system',
      component: DynComponent,
      resolve: {
        recentScan: RecentScanResolver,
        topInfo: AppInfoResolver,
        topAppStoreInfo: AppStoreInfoResolver,
        signerCertificate: SignerCertificateResolver,
        getJava: GetJavaResolver,
        getSamali: GetSamaliResolver,
        getManifest: ManifestResolver,
        apkidResolver: ApkidResolver,
        androidJavaApiResolver: AndroidJavaApiResolver,
        domainResolver: DomainResolver,
        browsableActivitiesResolver: BrowsableActivitiesResolver,
      },
    },
    {
      path: 'team',
      component: MaintenanceComponent,
    },
    {
      path: 'profile',
      component: MaintenanceComponent,
    },
    {
      path: 'support',
      component: SupportComponent,
    },

    {
      path: 'about',
      component: AboutComponent,
    },

    {
      path: 'api',
      component: ApiComponent,
    },

    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ],
})
export class PagesRoutingModule {
}
