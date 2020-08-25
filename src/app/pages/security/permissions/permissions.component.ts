import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { SecurityService } from '../../../@core/utils/security.service';

export interface AppPermissions {
  severity: string; // status in ios
  permission: string; // permission in ios
  info: string; // reason in ios
  description: string; // description in ios
}


@Component({
  selector: 'ngx-security-permissions',
  styleUrls: ['./permissions.component.scss'],
  templateUrl: './permissions.component.html',
})


export class PermissionsComponent implements OnInit {
  id: string;
  system: string;
  childId: string;
  selectedItem: string;

  displayedColumnsAppPermissions: string[] = [  'severity',   'permission',  'info',    'description' ];
  dataAppPermissions: any; //  = new MatTableDataSource(APPPERMISSIONS_DATA);
  emptyCheck: boolean = false;
  appPermissions: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {

    this.appPermissions = {};
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
        this.appPermissions = this.route.snapshot.data.appPermissions;
        this.dataAppPermissions = new MatTableDataSource(this.appPermissions.list);
        this.checkEmpty();
        this.dataAppPermissions.filterPredicate = (data1: AppPermissions, filter: string) => {
          return data1.severity === filter;
        };
      });
    this.route.params.subscribe(params => {
      this.childId = params['severity'];
      if (this.selectedItem !== params['severity']) {
        this.selectedItem = params['severity'];
      }
      if (params['severity'] === 'all') {
        this.selectedItem = '';
      }
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
    this.dataAppPermissions.filterPredicate = (data: AppPermissions, filter: string) => {
      return data.severity === filter;
    };
  }
  applyFilter(filterValue: string) {
    this.dataAppPermissions.filter = filterValue;
  }
  checkEmpty() {
    this.emptyCheck = this.dataAppPermissions.filteredData.length === 0;
  }
  doWhatEverOnChange() {
    // this.router.navigateByUrl(this.router.url.replace(this.childId, this.selectedItem));
    this.applyFilter(this.selectedItem);
    this.checkEmpty();

  }
}
