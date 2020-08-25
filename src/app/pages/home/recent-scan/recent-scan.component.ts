import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { RecentScan, RecentScanService } from '../../../@core/utils/recent-scans';

@Component({
  selector: 'ngx-recent-scan',
  templateUrl: './recent-scan.component.html',
  styleUrls: ['./recent-scan.component.scss'],
})
export class RecentScanComponent implements OnInit {
  items = [
    { title: 'Rescan' },
    { title: 'Delete Scan' },
  ];
  view: any[] = [135, 135];
  colorScheme = {
    domain: ['#FF6767', '#FFCC67', '#10D480'],
  };
  themeSubscription: any;
  hoverFileName = false;
  @Input() recentScans: RecentScan[];
  constructor(private router: Router,
    private recentScanService: RecentScanService,
    private sidebarService: NbSidebarService) {
  }
  ngOnInit() {
    if (this.recentScans.length > 0)
      this.recentScans.forEach((element: RecentScan) => {
        const foundIndex = this.recentScans.findIndex(x => x.md5 === element.md5);
        if (element.file_name.length > 30) {
          this.recentScans[foundIndex].file_name = element.file_name.substring(0, 24) + '..'
            + element.file_name.substring(element.file_name.length - 4, element.file_name.length);
        }

        this.recentScans[foundIndex].charts = [
          {
            name: 'High',
            value: element.issues_high,
          },
          {
            name: 'Medium',
            value: element.issues_mid,
          },
          {
            name: 'Low',
            value: element.issues_low,
          },
        ];
      });
  }
  navigateToSummary(): void {
    this.sidebarService.toggle(false, 'new-scan');
  }
  redirectTo(md5, system) {
    this.router.navigate(['/pages/summary/', md5, system]);
  }
  delete(md5) {
    this.recentScanService.deleteScan({'md5': md5}).subscribe(data => {
      if (data)
        this.recentScanService.setValue(this.recentScans.filter(x => x.md5 !== md5));
    });
  }
  rescan(md5, system) {

  }
}
