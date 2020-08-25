import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface BinaryAnalysis {
  severity: string;
  issue: string;
  description: string;
  file: string;
}

@Component({
  selector: 'ngx-security-binary',
  styleUrls: ['./binary.component.scss'],
  templateUrl: './binary.component.html',
})


export class BinaryComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsBinaryAnalysis: string[] = [  'severity',   'issue',    'description',   'file' ];
  // displayedColumnsBinaryAnalysis_iOS: string[] = [ 'severity',   'issue',    'standards',   'description' ];
  dataSourceBinaryAnalysis: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  binaryAnalysis: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
    this.binaryAnalysis = {};
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.binaryAnalysis = this.route.snapshot.data.binaryAnalysis;
      this.dataSourceBinaryAnalysis = new MatTableDataSource(this.binaryAnalysis.list);
      this.checkEmpty();
      this.dataSourceBinaryAnalysis.filterPredicate = (data1: BinaryAnalysis, filter: string) => {
        if (filter === '')
          return true;
        return data1.severity.toLowerCase() === filter.toLowerCase();
      };
    });

    this.route.params.subscribe(params => {
      this.selectedItem = params['severity'];
      if (params['severity'] === 'all') {
        this.selectedItem = '';
      }
      this.applyFilter(this.selectedItem);
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
      if (this.system === 'ios')
        this.displayedColumnsBinaryAnalysis = [  'severity',   'issue',    'standards',   'description' ];
      else
        this.displayedColumnsBinaryAnalysis = [  'severity',   'issue',    'description',   'file' ];
    });
    this.dataSourceBinaryAnalysis.filterPredicate = (data1: BinaryAnalysis, filter: string) => {
       return data1.severity.toLowerCase() === filter.toLowerCase();
    };
  }
  checkEmpty() {
    this.emptyCheck = this.dataSourceBinaryAnalysis.filteredData.length === 0;
  }
  applyFilter(filterValue: string) {
    this.dataSourceBinaryAnalysis.filter = filterValue;
  }
  doWhatEverOnChange() {
    this.applyFilter(this.selectedItem);
    this.checkEmpty();
  }
}
