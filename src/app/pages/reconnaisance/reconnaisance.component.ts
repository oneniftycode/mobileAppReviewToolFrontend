import { Component, OnInit } from '@angular/core';
import { Router, Event, RouterEvent, ActivatedRoute } from '@angular/router';
import { RecentScanService, RecentScan } from '../../@core/utils/recent-scans';
import { ReportTopInfoService } from '../../@core/utils/report-top-info';
import { filter } from 'rxjs/operators';

export interface URLS {
  url: string;
  file: string;
}

@Component({
  selector: 'ngx-reconnaisance',
  styleUrls: ['./reconnaisance.component.scss'],
  templateUrl: './reconnaisance.component.html',
})


export class ReconnaisanceComponent implements OnInit {
  title: string;
  id: string;
  system: string;
  sub: any;

  linkURLS = false;
  linkFirebase = false;
  linkEmail = false;
  linkTracker = false;
  linkString = false;
  hover = true;
  recentScan: RecentScan;
  topInfo: any;
  topAppStoreInfo: any;
  signerCertificate: any;
  dynamic: boolean;
  static: boolean;
  interactif: boolean;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private recentScanService: RecentScanService,
    private reportTopInfoService: ReportTopInfoService) {
    this.topInfo = {};
    this.topAppStoreInfo = {};
    this.signerCertificate = {};
    this.dynamic = false;
    this.static = true;
    this.interactif = false;
  }

  ngOnInit() {
    this.menuFunc(this.router.url);
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent),
    ).subscribe((e: RouterEvent) => {
      this.menuFunc(e.url);
    });
    this.recentScan = new RecentScan();
    this.route.params.subscribe(params => {

      this.id = params['id'];
      this.system = params['system'];

      this.recentScanService.getRecentScans().subscribe((value: RecentScan[]) => {
        this.recentScan = value.filter(x => x.md5 === this.id)[0];
        this.title = 'Reconnaissance > ' + this.recentScan.app_name;

      });
    });
  }
  menuFunc(router): void {
    if (router.includes('/email')) {
      this.resetMenu();
      this.linkEmail = true;
    } else if (router.includes('/firebase')) {
      this.resetMenu();
      this.linkFirebase = true;
    } else if (router.includes('/tracker')) {
      this.resetMenu();
      this.linkTracker = true;
    } else if (router.includes('/urls')) {
      this.resetMenu();
      this.linkURLS = true;
    } else if (router.includes('/string')) {
      this.resetMenu();
      this.linkString = true;
    } else {
      this.resetMenu();
      this.linkURLS = true;
    }
  }
  resetMenu(): void {
    this.linkString = false;
    this.linkURLS = false;
    this.linkTracker = false;
    this.linkFirebase = false;
    this.linkEmail = false;
  }

}
