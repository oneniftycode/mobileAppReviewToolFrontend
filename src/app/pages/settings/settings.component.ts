import {Component, OnInit, OnDestroy} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {NbMenuService} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReportMenuService } from '../../@core/utils/report-menu.service';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit,OnDestroy {

  constructor(private reportMenuService: ReportMenuService,) {
  }
  ngOnInit() {
    this.reportMenuService.setValue("expanded");
  }
  ngOnDestroy() {
    this.reportMenuService.setValue("collapsed");
  }

  time = {hour: 13, minute: 30};

  title = 'settings > ';

  items: NbMenuItem[] = [
    {
      title: 'Account',
      icon: 'person-outline',
      link: 'account',
    },
    {
      title: 'Notifications',
      icon: 'bell-outline',
    },
    {
      title: 'Colleagues',
      icon: 'people-outline',
    },
    {
      title: 'Integrations',
      icon: {icon: 'plus-square-outline', pack: 'eva'},
    },
    {
      title: 'Tags',
      icon: 'pricetags-outline',
    },

  ];

}
