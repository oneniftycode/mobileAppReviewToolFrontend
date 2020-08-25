import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { RecentScanService, RecentScan } from '../../@core/utils/recent-scans';
import { ReportTopInfoService } from '../../@core/utils/report-top-info';
import { SummaryService } from '../../@core/utils/summary.service';
import { NbWindowService } from '@nebular/theme';
import { MatTableDataSource } from '@angular/material/table';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-summary',
  styleUrls: ['./summary.component.scss'],
  templateUrl: './summary.component.html',
})

export class SummaryComponent implements OnInit {
  title: string;
  id: string;
  system: string;
  sub: any;
  dynamic: boolean;
  static: boolean;
  interactif: boolean;
  recentScan: RecentScan;
  securityOverview: any;
  malwareOverview: any;
  malwareCount: number;
  domainAnalysis: any;
  selectedItem = 'tracker';
  componentData: any;
  displayedColumnsData = ['row'];
  dataActivities: any;
  dataServices: any;
  dataReceivers: any;
  dataProviders: any;
  @ViewChild('activitiesTemplate') activitiesTemplate: TemplateRef<any>;
  @ViewChild('servicesTemplate') servicesTemplate: TemplateRef<any>;
  @ViewChild('receiversTemplate') receiversTemplate: TemplateRef<any>;
  @ViewChild('providersTemplate') providersTemplate: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private sidebarService: NbSidebarService,
    private nbWindowService: NbWindowService,
    private recentScanService: RecentScanService,
    private summaryService: SummaryService,
    private reportTopInfoService: ReportTopInfoService) {
    this.domainAnalysis = [];
    this.securityOverview = {
      manifest: { high: 0, medium: 0, info: 0 },
      code: { high: 0, good: 0, warning: 0, info: 0 },
      binary: { high: 0, medium: 0, info: 0 },
      app: { high: 0, medium: 0, info: 0 },
      file: { high: 0, medium: 0, info: 0 },
    };
    this.recentScan = new RecentScan();
    this.componentData = {
      activities: {},
      service: {},
      providers: {},
      receivers: {},
    };
    this.dynamic = false;
    this.static = true;
    this.interactif = false;

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.recentScan = this.route.snapshot.data.recentScan.filter(x => x.md5 === this.id)[0];
      this.system = this.recentScan.system;
      this.securityOverview = this.route.snapshot.data.securityOverview;
      this.malwareOverview = this.route.snapshot.data.malwareOverview;
      if (this.system === 'android')
        this.malwareCount = this.malwareOverview.apkid.total +
          this.malwareOverview.domain.total +
          this.malwareOverview.api.total +
          this.malwareOverview.activity.total +
          this.malwareOverview.antivirus.total;
      else
        this.malwareCount = this.malwareOverview.domain.total;
      this.domainAnalysis = this.route.snapshot.data.domainAnalysis;
      this.componentData.activities = this.route.snapshot.data.getComponentsActivities;
      this.componentData.services = this.route.snapshot.data.getComponentsServices;
      this.componentData.providers = this.route.snapshot.data.getComponentsProviders;
      this.componentData.receivers = this.route.snapshot.data.getComponentsReceivers;
    });
  }

  openActivitiesWindow() {
    const context_data = this.componentData.activities['page_info']['list'];
    const dataInfo = [];
    if (context_data.length > 0) {
      context_data.forEach(element => {
        const pusheditems = { 'row': element };
        dataInfo.push(pusheditems);
      });

    } else {
      const pusheditems = { 'row': 'No data to show' };
      dataInfo.push(pusheditems);
    }
    this.dataServices = new MatTableDataSource(dataInfo);
    this.nbWindowService.open(
      this.servicesTemplate,
      {
        title: 'View Receivers', context: {
          column: this.displayedColumnsData,
          data: this.dataServices,
        },
      },
    );
  }
  openServicesWindow() {
    const context_data = this.componentData.services['page_info']['list'];
    const dataInfo = [];
    if (context_data.length > 0) {
      context_data.forEach(element => {
        const pusheditems = { 'row': element };
        dataInfo.push(pusheditems);
      });

    } else {
      const pusheditems = { 'row': 'No data to show' };
      dataInfo.push(pusheditems);
    }
    this.dataServices = new MatTableDataSource(dataInfo);
    this.nbWindowService.open(
      this.servicesTemplate,
      {
        title: 'View Services', context: {
          column: this.displayedColumnsData,
          data: this.dataServices,
        },
      },
    );
  }
  openReceiversWindow() {
    const context_data = this.componentData.receivers['page_info']['list'];
    const dataInfo = [];
    if (context_data.length > 0) {
      context_data.forEach(element => {
        const pusheditems = { 'row': element };
        dataInfo.push(pusheditems);
      });

    } else {
      const pusheditems = { 'row': 'No data to show' };
      dataInfo.push(pusheditems);
    }
    this.dataServices = new MatTableDataSource(dataInfo);
    this.nbWindowService.open(
      this.servicesTemplate,
      {
        title: 'View Receivers', context: {
          column: this.displayedColumnsData,
          data: this.dataServices,
        },
      },
    );
  }
  openProvidersWindow() {
    const context_data = this.componentData.providers['page_info']['list'];
    const dataInfo = [];
    if (context_data.length > 0) {
      context_data.forEach(element => {
        const pusheditems = { 'row': element };
        dataInfo.push(pusheditems);
      });

    } else {
      const pusheditems = { 'row': 'No data to show' };
      dataInfo.push(pusheditems);
    }
    this.dataServices = new MatTableDataSource(dataInfo);
    this.nbWindowService.open(
      this.servicesTemplate,
      {
        title: 'View Providers', context: {
          column: this.displayedColumnsData,
          data: this.dataServices,
        },
      },
    );

  }

}
