import { Component, OnInit, Input, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, Event, RouterEvent, ActivatedRoute } from '@angular/router';
import { RecentScan } from '../../@core/utils/recent-scans';
import { map, filter } from 'rxjs/operators';
import { ReportMenuService } from '../../@core/utils/report-menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ReportTopInfoService } from '../../@core/utils/report-top-info';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

import saveAs from 'file-saver';

import {
  NbWindowService,
  NbComponentStatus,
  NbSidebarService,
  NbThemeService,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbMenuService,
  NbToastrConfig,
} from '@nebular/theme';

@Component({
  selector: 'ngx-top-app-info',
  styleUrls: ['./top-app-info.component.scss'],
  templateUrl: './top-app-info.component.html',
})

export class TopAppInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() static: boolean;
  @Input() dynamic: boolean;
  @Input() interactif: boolean;
  title: string;
  items = [
    { title: 'Print' },
    { title: 'PDF' },
    { title: 'Share' },
  ];
  codeMirrorOptions: any = {
    theme: 'elegant',
    mode: 'application/xml',
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    readOnly: true,
  };
  view: any[] = [130, 130];
  colorScheme = {
    domain: ['#FF6767', '#FFCC67', '#10D480'],
  };
  backdrop = false;
  backdropJava = false;
  backdropSamali = false;
  linkReconnaissance = false;
  linkComponent = false;
  linkMalware = false;
  linkFrinda = false;
  linkDynamicMalware = false;
  linkInteractif = false;
  linkSummary = false;
  linkSecurity = false;
  hover = true;
  themeSubscription: any;
  recentScan: RecentScan;
  topAppStoreInfo: any;
  signerCertificate: any;
  manifestAndroid: any;
  javaCode: any;
  samaliCode: any;
  id: string;
  system: string;
  checkSystem: boolean;
  sub: any;
  topInfo: any;
  newScan: boolean;
  displayedColumnsJava: string[];
  dataSourceJava: any;
  dataSourceSmali: any;
  toastatus: NbComponentStatus = 'primary';
  selectedItem: any;
  hoverFileName = false;
  showHover: string;
  certificate_info: any;
  @ViewChild('manifestTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('codeMirror') private codeEditorCmp: CodemirrorComponent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private menuService: NbMenuService,
    private reportTopInfoService: ReportTopInfoService,
    private nbWindowService: NbWindowService,
    private reportMenuService: ReportMenuService,
    private sidebarService: NbSidebarService ) {
    this.recentScan = new RecentScan();
    this.topInfo = {};
    this.topAppStoreInfo = {};
    this.signerCertificate = {};
    this.javaCode = {};
    this.samaliCode = {};
    this.newScan = false;
    this.certificate_info = {};

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
      this.menuFunc(this.router.url);
      this.router.events.pipe(
        filter((e: Event): e is RouterEvent => e instanceof RouterEvent),
      ).subscribe((e: RouterEvent) => {
        this.menuFunc(e.url);
      });
    });
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'export-menu'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => this.makeToast());

    this.recentScan = new RecentScan();

    this.recentScan = this.route.snapshot.data.recentScan.filter(x => x.md5 === this.id)[0];
    this.checkSystem = this.recentScan.system === 'android';
    if (this.recentScan.file_name.length > 30) {
      this.hoverFileName = true;
      this.showHover = this.recentScan.file_name;
      this.recentScan.file_name = this.recentScan.file_name.substring(0, 24) + '..' +
        this.recentScan.file_name.substring(this.recentScan.file_name.length - 4, this.recentScan.file_name.length);
    }
    this.recentScan.charts = [
      {
        name: 'High',
        value: this.recentScan.issues_high,
      },
      {
        name: 'Medium',
        value: this.recentScan.issues_mid,
      },
      {
        name: 'Low',
        value: this.recentScan.issues_low,
      },
    ];

    this.topInfo = this.route.snapshot.data.topInfo;
    this.title = this.topInfo.app_name;
    this.topAppStoreInfo = this.route.snapshot.data.topAppStoreInfo;
    if (this.recentScan.system !== 'android') {
      // this.certificate_info = this.signerCertificate.certificate_info;
    } else {
      this.javaCode = this.route.snapshot.data.getJava;
      this.samaliCode = this.route.snapshot.data.getSamali;
      this.manifestAndroid = this.route.snapshot.data.getManifest;
      this.signerCertificate = this.route.snapshot.data.signerCertificate;
      this.certificate_info = this.signerCertificate.certificate_info;

      const prepareJavaCode = [];
    if (this.javaCode.files.list.length > 0)
      this.javaCode.files.list.forEach(element => {
        const pusheditems = {};
        pusheditems['file'] = element;
        prepareJavaCode.push(pusheditems);
      });

      const prepareSmaliCode = [];
      if (this.samaliCode.files.list.length > 0)
        this.samaliCode.files.list.forEach(element => {
          const pusheditems = {};
          pusheditems['file'] = element;
          prepareSmaliCode.push(pusheditems);
        });
      this.displayedColumnsJava = ['file'];
      this.dataSourceJava = new MatTableDataSource(prepareJavaCode);
      this.dataSourceSmali = new MatTableDataSource(prepareSmaliCode);
    }


  }
  makeToast() {
    this.showToast(this.toastatus, 'Info', 'Coming soon');
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      `${title}`,
      config);
  }
  toggleRight() {
    this.sidebarService.toggle(false, 'summary-right');
    this.backdrop = !this.backdrop;
  }
  toggleRightSamali() {
    this.sidebarService.toggle(false, 'samali-right');
    this.backdropSamali = !this.backdropSamali;
  }
  toggleRightJava() {
    this.sidebarService.toggle(false, 'java-right');
    this.backdropJava = !this.backdropJava;
  }
  toggleNewScan() {
    if (!this.newScan) {
      this.reportMenuService.setValue('expanded');
      this.newScan = true;
    } else {
      this.reportMenuService.setValue('collapsed');
      this.newScan = false;
    }
  }
  openManfistWindow() {
    this.nbWindowService.open(
      this.contentTemplate,
      { title: 'View AndroidManifest.xml', context: { text: this.manifestAndroid } },
    );
    setTimeout(() => this.codeEditorCmp.codeMirror.refresh(), 1000);

  }
  menuFunc(router): void {
    if (router.includes('/pages/summary/')) {
      this.resetMenu();
      this.linkSummary = true;
    } else if (router.includes('/pages/security')) {
      this.resetMenu();
      this.linkSecurity = true;
    } else if (router.includes('/pages/malware/')) {
      this.resetMenu();
      this.linkMalware = true;
    } else if (router.includes('/pages/components/')) {
      this.resetMenu();
      this.linkComponent = true;
    } else if (router.includes('/pages/reconnaisance/')) {
      this.resetMenu();
      this.linkReconnaissance = true;
    }
  }
  resetMenu(): void {
    this.linkReconnaissance = false;
    this.linkComponent = false;
    this.linkMalware = false;
    this.linkSecurity = false;
    this.linkSummary = false;
  }
  menuFuncDynamic(router): void {
    if (router.includes('/pages/dynamic/' + this.id + '/' + this.system + '/frida')) {
      this.resetMenuDynamic();
      this.linkFrinda = true;
    } else if (router.includes('/pages/dynamic/' + this.id + '/' + this.system + '/malware')) {
      this.resetMenuDynamic();
      this.linkDynamicMalware = true;
    } else if (router.includes('/pages/dynamic/' + this.id + '/' + this.system + '/interactif')) {
      this.resetMenuDynamic();
      this.linkInteractif = true;
    } else {
      this.resetMenuDynamic();
      this.linkFrinda = true;
    }
  }
  resetMenuDynamic(): void {
    this.linkFrinda = false;
    this.linkDynamicMalware = false;
    this.linkInteractif = false;
  }
  saveFile(type) {
    this.reportTopInfoService.getDownload(this.id, type).subscribe((events: HttpEvent<any>) => {
      if (events instanceof HttpResponse) {
        this.saveToFileSystem(events, type);
      }
    });

  }

  private saveToFileSystem(response, type) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filenameA = parts[1].split('=')[1];
    const filename = type + '_' + filenameA.split('"')[1];
    const blob = new Blob([response.body], { type: response.headers.get('content-type') });
    saveAs(blob, filename);
  }

}
