import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReconnaisanceComponent } from './reconnaisance.component';

import { EmailComponent } from './email/email.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { StringComponent } from './string/string.component';
import { UrlsComponent } from './urls/urls.component';
import { TrackerComponent } from './tracker/tracker.component';

import { EmailsResolver } from './email/email.resolver';
import { FirebaseResolver } from './firebase/firebase.resolver';
import { UrlsResolver } from './urls/urls.resolver';
import { TrackersResolver } from './tracker/tracker.resolver';
import { StringsResolver } from './string/string.resolver';

export const routes: Routes = [
  {

    path: '',
    component: ReconnaisanceComponent,
    children: [
      {
        path: '',
        component: UrlsComponent,
        resolve: {
          urls: UrlsResolver
        },

      },
      {
        path: 'urls',
        component: UrlsComponent,
        resolve: {
          urls: UrlsResolver
        }

      },
      {
        path: 'tracker',
        component: TrackerComponent,
        resolve: {
          trackers: TrackersResolver
        }

      },
      {
        path: 'string',
        component: StringComponent,
        resolve: {
          strings: StringsResolver
        }

      },
      {
        path: 'firebase',
        component: FirebaseComponent,
        resolve: {
          firebase: FirebaseResolver
        }

      },
      {
        path: 'email',
        component: EmailComponent,
        resolve: {
          emails: EmailsResolver
        }

      },



    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReconnaisanceRoutingModule {
}
