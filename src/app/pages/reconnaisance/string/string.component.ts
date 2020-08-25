import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface String {
  allstrings: string;
  intersting: string;
}


@Component({
  selector: 'ngx-reconnaisance-string',
  styleUrls: ['./string.component.scss'],
  templateUrl: './string.component.html',
})


export class StringComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsString: string[] = ['string', 'description'];
  dataSourceString: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  strings: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
    this.strings = {};


  }

  ngOnInit() {
    this.route.data.subscribe(data => {

      this.strings = data.strings;
      this.dataSourceString = new MatTableDataSource(this.strings.list);
      if (this.dataSourceString.filteredData.length === 0)
        this.emptyCheck = true;
    });

    this.route.parent.params.subscribe(params => {

      this.id = params['id'];
      this.system = params['system'];

    });
  }
}
