import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbWindowService } from '@nebular/theme';


@Component({
  selector: 'ngx-components',
  styleUrls: ['./components.component.scss'],
  templateUrl: './components.component.html',
})


export class ComponentsComponent implements OnInit {
  title: string;
  id: string;
  system: string;
  sub: any;
  @ViewChild('activitiesTemplate') activitiesTemplate: TemplateRef<any>;
  @ViewChild('servicesTemplate') servicesTemplate: TemplateRef<any>;
  @ViewChild('receiversTemplate') receiversTemplate: TemplateRef<any>;
  @ViewChild('providersTemplate') providersTemplate: TemplateRef<any>;
  componentData: any;
  displayedColumnsData = ['row'];
  dataActivities: any;
  dataServices: any;
  dataReceivers: any;
  dataProviders: any;
  dynamic: boolean;
  static: boolean;
  interactif: boolean;
  constructor(private route: ActivatedRoute,
              private nbWindowService: NbWindowService) {
    this.title = 'Components';
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
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
    this.componentData.activities = this.route.snapshot.data.getComponentsActivities;
    this.componentData.services = this.route.snapshot.data.getComponentsServices;
    this.componentData.providers = this.route.snapshot.data.getComponentsProviders;
    this.componentData.receivers = this.route.snapshot.data.getComponentsReceivers;

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
