import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface Tracker {
  tracker: string;
  url: string;
}


@Component({
  selector: 'ngx-reconnaisance-tracker',
  styleUrls: ['./tracker.component.scss'],
  templateUrl: './tracker.component.html',
})


export class TrackerComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsTracker: string[] = ['tracker', 'link'];
  dataSourceTracker: any; //  = new MatTableDataSource(BINARYANALYSIS_DATA);
  trackers: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private securityService: SecurityService) {
    this.trackers = {};
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.trackers = data.trackers;
      this.dataSourceTracker = new MatTableDataSource(this.trackers.list);
      if (this.dataSourceTracker.filteredData.length === 0)
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
