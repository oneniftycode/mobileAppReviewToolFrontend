import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportMenuService } from '../../@core/utils/report-menu.service';


@Component({
  selector: 'ngx-maintenance',
  styleUrls: ['./maintenance.component.scss'],
  templateUrl: './maintenance.component.html',
})

export class MaintenanceComponent implements OnInit, OnDestroy{

  constructor(private reportMenuService: ReportMenuService,) {
  }
  ngOnInit() {
    this.reportMenuService.setValue("expanded");
  }
  ngOnDestroy() {
    this.reportMenuService.setValue("collapsed");
  }
}
