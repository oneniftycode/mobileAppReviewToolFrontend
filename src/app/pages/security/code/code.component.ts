import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { SecurityService } from '../../../@core/utils/security.service';



export interface CodeAnalysis {
  severity: string;
  issue: string;
  cvss: number;
  cwe: string;
  owasp: string;
  owasmasvs: string;
  file: string;
}

@Component({
  selector: 'ngx-security-code',
  styleUrls: ['./code.component.scss'],
  templateUrl: './code.component.html',
})


export class CodeComponent implements OnInit {
  id: string;
  system: string;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  displayedColumnsCodeAnalysis: string[] = [  'severity',   'issue',    'cvss',   'cwe', 'owasp', 'owasmasvs', 'file' ];
  dataSourceCodeAnalysis: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  codeAnalysis: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private securityService: SecurityService) {
    this.codeAnalysis = {};
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.codeAnalysis = this.route.snapshot.data.codeAnalysis;
      this.dataSourceCodeAnalysis = new MatTableDataSource(this.codeAnalysis.list);
      this.checkEmpty();
      this.dataSourceCodeAnalysis.filterPredicate = (data1: any, filter: string) => {
        return data1.severity.toLowerCase() === filter.toLowerCase();
      };
    });
    this.route.params.subscribe(params => {
      this.childId = params['severity'];
      this.selectedItem = params['severity'];
      if (params['severity'] === 'all') {
        this.selectedItem = '';
      }
      this.applyFilter(this.selectedItem);
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
    this.dataSourceCodeAnalysis.filterPredicate = (data: any, filter: string) => {
      if (filter === '')
        return true;
      return data.severity.toLowerCase() === filter.toLowerCase();
    };

  }
  applyFilter(filterValue: string) {
    this.dataSourceCodeAnalysis.filter = filterValue;
  }
  doWhatEverOnChange() {
      // this.router.navigateByUrl(this.router.url.replace(this.childId, this.selectedItem));
      this.applyFilter(this.selectedItem);
    this.checkEmpty();
  }
  checkEmpty() {
    this.emptyCheck = this.dataSourceCodeAnalysis.filteredData.length === 0;
  }
  open(dialog: TemplateRef<any>, file) {
    this.dialogService.open(dialog, { context: file });
  }
}
