import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface Firebase {
  severity: string;
  firbaseurl: string;
  details: string;
}



@Component({
  selector: 'ngx-reconnaisance-firebase',
  styleUrls: ['./firebase.component.scss'],
  templateUrl: './firebase.component.html',
})


export class FirebaseComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsFirebase: string[] = ['status', 'url', 'message'];
  dataSourceFirebase: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  firebase: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
    this.firebase = {};

  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.firebase = data.firebase;
      this.dataSourceFirebase = new MatTableDataSource(this.firebase.list);
      if (this.dataSourceFirebase.filteredData.length === 0)
        this.emptyCheck = true;
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });

  }

}
