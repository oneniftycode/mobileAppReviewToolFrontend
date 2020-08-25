import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';
export class Issue {
  list: any[];
  issue_decorator: string;
}
export class ManifestAnalysis {
  severity: string;
  issue: Issue;
  description: string;
}

@Component({
  selector: 'ngx-security-manifest',
  styleUrls: ['./manifest.component.scss'],
  templateUrl: './manifest.component.html',
})


export class ManifestComponent implements OnInit {
  id: string;
  system: string;
  childId: string;
  selectedItem: string;
  displayedColumnsManifestAnalysis: string[] = ['severity', 'issue', 'description'];

  dataSourceManifestAnalysis: any; // = new MatTableDataSource(MANIIFESTANALYSIS_DATA);
  emptyCheck: boolean;


  manifestAnalysis: any;
  manifestAnalysisCorrect: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
    this.manifestAnalysis = {};
    this.manifestAnalysisCorrect = [];
    this.emptyCheck = false;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.manifestAnalysis = this.route.snapshot.data.manifestAnalysis;
      this.manifestAnalysisCorrect = [];

       this.manifestAnalysis.page.list.forEach(element => {
        const new_item: ManifestAnalysis = new ManifestAnalysis();
        new_item.issue = new Issue();
        new_item.issue.list = [];
        new_item.description = element.description;
        new_item.severity = element.severity;
        const splitIssue = element.issue.split('<strong>');
        if (splitIssue.length > 1) {
          const splitStrong = splitIssue[1].split('</strong>');
          new_item.issue.issue_decorator = splitStrong[0];
          const split_br = splitStrong[1].split('<br>');
          split_br.forEach(lastsplit => {
            new_item.issue.list.push(lastsplit.replace('</br>', '\n'));
          });
        }
        if (new_item.issue.list.length === 0) {
          const split_br = element.issue.split('<br>');
          split_br.forEach(lastsplit => {
             new_item.issue.list.push(lastsplit.replace('</br>', '\n'));
          });
        }
        if (new_item.issue.list.length === 0) {
          new_item.issue.list.push(element.issue);
        }
        this.manifestAnalysisCorrect.push(new_item);
      });

      this.dataSourceManifestAnalysis = new MatTableDataSource(this.manifestAnalysisCorrect);
      this.dataSourceManifestAnalysis.filterPredicate = (data1: ManifestAnalysis, filter: string) => {
        return data1.severity.toLowerCase() === filter.toLowerCase();
      };
    });
    this.checkEmpty();

    this.route.params.subscribe(params => {
      this.childId = params['severity'];
      if (this.router.url.includes('/manifest/') || this.router.url.includes('/ats/')) {
        if (params['severity'] === 'all') {
          this.selectedItem = '';
        } else if (params['severity'] !== 'all' && this.selectedItem !== params['severity']) {
          this.selectedItem = params['severity'];
        }
      } else {
        this.selectedItem = '';
      }
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
    this.applyFilter(this.selectedItem);
    this.dataSourceManifestAnalysis.filterPredicate = (data: ManifestAnalysis, filter: string) => {
      return data.severity.toLowerCase() === filter.toLowerCase();
    };
  }
  applyFilter(filterValue: string) {
    this.dataSourceManifestAnalysis.filter = filterValue;
  }
  checkEmpty() {
    this.emptyCheck = this.dataSourceManifestAnalysis.filteredData.length === 0;
  }

  doWhatEverOnChange() {
    // this.router.navigateByUrl(this.router.url.replace(this.childId, this.selectedItem));
    this.applyFilter(this.selectedItem);
    this.checkEmpty();
  }
}
