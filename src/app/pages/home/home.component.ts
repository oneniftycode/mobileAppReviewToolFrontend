import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { RecentScanService, RecentScan } from '../../@core/utils/recent-scans';
import { ReportMenuService } from '../../@core/utils/report-menu.service';

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, OnDestroy {
  title: string;
  empty: boolean;
  recentScans: RecentScan[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sidebarService: NbSidebarService,
    private reportMenuService: ReportMenuService,
    private recentScanService: RecentScanService,
    private service: RecentScanService) {
    this.title = 'Reports';
  }

  ngOnInit() {
        this.reportMenuService.setValue('expanded');
        const data = this.route.snapshot.data.recentScan ;
        this.service.setValue(data);
        this.service.getValue().subscribe((value) => {
            if (data.length !== 0) {
              this.recentScans = value;
              this.empty = false;

            }  else {
              this.empty = true;
            }

        });
  }
  ngOnDestroy() {
    this.reportMenuService.setValue('collapsed');
  }

}
