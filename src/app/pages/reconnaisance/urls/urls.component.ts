import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface file {
  urls: any;
  file: string;
}

@Component({
  selector: 'ngx-reconnaisance-urls',
  styleUrls: ['./urls.component.scss'],
  templateUrl: './urls.component.html',
})


export class UrlsComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsURLS: string[] = ['urls', 'path'];
  dataSourceURLS: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  urls: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private securityService: SecurityService) {
    this.urls = {};
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.urls = data.urls;
      this.dataSourceURLS = new MatTableDataSource(this.urls.list);
      if (this.dataSourceURLS.filteredData.length === 0)
        this.emptyCheck = true;
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
  }
  open(dialog: TemplateRef<any>, file) {
    this.dialogService.open(dialog, { context: file });
  }

}
