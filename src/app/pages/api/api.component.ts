import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportMenuService } from '../../@core/utils/report-menu.service';

export interface ApiElement {
  paramname: string;
  paramvalue: string;
  required: string;
}
const ELEMENT_DATA: ApiElement[] = [

  { paramname: 'file', paramvalue: 'multipart/form-data', required: 'Yes' },

];
@Component({
  selector: 'ngx-api',
  styleUrls: ['./api.component.scss'],
  templateUrl: './api.component.html',
})

export class ApiComponent implements OnInit, OnDestroy {
  title: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['paramname', 'paramvalue', 'required'];

  constructor(private reportMenuService: ReportMenuService) {
    this.title = 'Api Docs';
  }
  ngOnInit() {
    this.reportMenuService.setValue('expanded');
  }
  ngOnDestroy() {
    this.reportMenuService.setValue('collapsed');
  }
}
