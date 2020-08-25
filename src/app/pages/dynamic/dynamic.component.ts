import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RecentScanService } from '../../@core/utils/recent-scans';
import { ReportTopInfoService } from '../../@core/utils/report-top-info';

@Component({
  selector: 'nb-flip-card-colors, nb-card-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dynamic.component.scss'],
  templateUrl: "./dynamic.component.html",
})
export class DynComponent {

  selectedItem        = "";
  hover               = true;
  topInfo             : any;
  topAppStoreInfo     : any;
  signerCertificate   : any;
  browsableActivities : any;
  title               : string;
  id                  : string;
  system              : string;
  dynamic             : boolean;
  static              : boolean;
  interactif          : boolean;
  recentScan          : {};
  link_xml            : boolean;
  link_binder         : boolean;
  link_app_data       : boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recentScanService: RecentScanService,
    private reportTopInfoService: ReportTopInfoService) {
      
      this.dynamic             = true;
      this.static              = false;
      this.interactif          = false;
      this.topInfo             = {};
      this.topAppStoreInfo     = {};
      this.signerCertificate   = {};
      this.browsableActivities = {};
      this.recentScan          = {};

      this.route.params.subscribe(params => {
        this.id     = params['id'];
        this.system = params['system'];
        this.recentScanService.get_just_one(this.id).subscribe((value: {}) => {
          this.recentScan = value;
          this.title = this.recentScan["app_name"];
        });
      });
  }
  
  
}