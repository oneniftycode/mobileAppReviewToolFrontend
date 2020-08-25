import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportMenuService } from '../../@core/utils/report-menu.service';


@Component({
  selector: 'ngx-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
})

export class AboutComponent implements OnInit, OnDestroy{

  title: string;

  constructor(private reportMenuService: ReportMenuService,) {
    this.title = "About";

  }
  ngOnInit() {
    this.reportMenuService.setValue("expanded");
  }
  ngOnDestroy() {
    this.reportMenuService.setValue("collapsed");
  }
}
