import { Component, OnInit } from '@angular/core';
import { Router, Event, RouterEvent, ActivatedRoute } from '@angular/router';
import { RecentScanService, RecentScan } from '../../@core/utils/recent-scans';
import { ReportTopInfoService } from '../../@core/utils/report-top-info';
import { SecurityService } from '../../@core/utils/security.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-security',
  styleUrls: ['./security.component.scss'],
  templateUrl: './security.component.html',
})


export class SecurityComponent implements OnInit {
  title: string;
  id: string;
  system: string;
  sub: any;
  // MENU
  linkPermissions = false;
  linkCode = false;
  linkFile = false;
  linkManifest = false;
  linkBinary = false;
  linkATS = false;
  // END MENY
  hover = true;
  selectedItem = '';

  recentScan: RecentScan;
  topInfo: any;
  topAppStoreInfo: any;
  signerCertificate: any;
  securityOverview: any;
  dynamic: boolean;
  static: boolean;
  interactif: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recentScanService: RecentScanService,
    private reportTopInfoService: ReportTopInfoService,
    private securityService: SecurityService) {
    this.topInfo = {};
    this.topAppStoreInfo = {};
    this.signerCertificate = {};
    this.securityOverview = {};
    this.recentScan = new RecentScan();
    this.dynamic = false;
    this.static = true;
    this.interactif = false;

  }

  ngOnInit() {
    this.securityOverview = this.route.snapshot.data.securityOverview;
    this.menuFunc(this.router.url);
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent),
    ).subscribe((e: RouterEvent) => {
      this.menuFunc(e.url);
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
      this.recentScanService.getRecentScans().subscribe((value: RecentScan[]) => {
        this.recentScan = value.filter(x => x.md5 === this.id)[0];
        this.title = this.recentScan.app_name + ' > Security Report';
      });

    });

  }
  menuFunc(router): void {
    if (router.includes('/manifest')) {
      this.resetMenu();
      this.linkManifest = true;
    } else if (router.includes('/code')) {
      this.resetMenu();
      this.linkCode = true;
    } else if (router.includes('/file')) {
      this.resetMenu();
      this.linkFile = true;
    } else if (router.includes('/binary')) {
      this.resetMenu();
      this.linkBinary = true;
    } else if (router.includes('/permissions')) {
      this.resetMenu();
      this.linkPermissions = true;
    } else if (router.includes('/ats')) {
      this.resetMenu();
      this.linkATS = true;
    } else {
      this.resetMenu();
      this.linkManifest = true;
    }
  }
  resetMenu(): void {
    this.linkManifest = false;
    this.linkFile = false;
    this.linkCode = false;
    this.linkBinary = false;
    this.linkPermissions = false;
    this.linkATS = false;
  }

}
