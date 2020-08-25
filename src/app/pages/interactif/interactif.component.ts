import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { DynamicService } from '../../@core/utils/dynamic.service';
import { ScriptsService } from '../../@core/utils/scripts.service';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { NbWindowService } from '@nebular/theme';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
export class Cmd {
  request: string;
  answer: string;
}

@Component({
  selector: 'ngx-interactif',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./interactif.component.scss'],
  templateUrl: './interactif.component.html',
})

export class InteractifComponent implements OnInit, OnDestroy {
  @ViewChild('codeMirror') private codeEditorCmp: CodemirrorComponent;
  @ViewChild('fridaLog') contentTemplate: TemplateRef<any>;

  id: string;
  system: string;
  title: string;
  script: string;
  scripts: string[];
  errors: string[];
  dynamic: boolean;
  static: boolean;
  stream: string;
  commands: Cmd[];
  default_request: string;
  height: string;
  width: string;
  auxiliary_request: string;
  imageBlobUrl: SafeUrl;
  interactif: boolean;
  reportLoading: boolean;
  today: number = Date.now();
  codeMirrorOptions: any = {
    theme: 'default',
    mode: 'javascript',
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,

  };
  private stopPolling = new Subject();
  private screenshot$: Observable<any>;
  texts: string[] = [
    'Setting up Dynamic Analysis environment.',
    'Running HTTPS intercepting proxy.',
    'Invoking Kensa agents.',
    'Environment is ready for user assisted dynamic analysis.',
    'Navigate through all the flows of the app manually.'
  ];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dynamicService: DynamicService,
    private scriptsService: ScriptsService,
    private nbWindowService: NbWindowService,
    // private dialogService: NbDialogService,
    // private securityService: SecurityService
  ) {
    this.dynamic = true;
    this.static = false;
    this.interactif = true;
    this.reportLoading = false;
    this.title = 'Interactive';
    this.default_request = 'api_monitor,ssl_pinning_bypass,debugger_check_bypass,root_bypass,';
    this.auxiliary_request = '';
    this.script = '';
    this.scripts = [];
    this.commands = [];
    this.errors = [];
  }

  ngOnInit() {
    this.width = this.route.snapshot.data.init.screen_witdth;
    this.height = this.route.snapshot.data.init.screen_height;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
    this.screenshot$ = timer(3, 3000).pipe(
      switchMap(() => this.dynamicService.startSteam(this.id)),
      retry(),
      share(),
      takeUntil(this.stopPolling),
    );
    this.screenshot$.subscribe(data => {
      this.dynamicService.getSteam(this.id).subscribe(datai => {
        this.imageBlobUrl = datai; // console.log();
        this.createImageFromBlob(datai);
      });
    });
    setTimeout(() => this.codeEditorCmp.codeMirror.refresh(), 1000);
  }
  openLogFile() {
    this.nbWindowService.open(
      this.contentTemplate,
      { title: 'Frida log', context: { text: '' } },
    );
    setTimeout(() => this.codeEditorCmp.codeMirror.refresh(), 1000);

  }
  touch(cordin) {
    const width = parseInt(this.width);
    const height = parseInt(this.height);
    let x = cordin['x'];
    let y = cordin['y'];
    x = x * (width / 320);
    y = y * (height / 580);
    console.log('X Axis: ' + x + ' Y Axis: ' + y);
    this.dynamicService.touch(this.id, { x: x + '', y: y + '' }).subscribe(data => {
      console.log(data);
    });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  ngOnDestroy() {
    this.stopPolling.next();
  }
  clickEvent(e) {
    // e = Mouse click event.
    const rect = e.target.getBoundingClientRect();
    var cordin = [];
    cordin['x'] = e.clientX - rect.left; // x position within the element.
    cordin['y'] = e.clientY - rect.top;  // y position within the element.
    console.log(cordin);

    return this.touch(cordin);
  }
  setDefaultStatus(checked, value) {
    if (checked.target.checked) {
      this.default_request += value + ',';
    } else {
      this.default_request = this.default_request.replace(value + ',', '');
    }
  }
  setAuxStatus(checked, value) {
    if (checked.target.checked) {
      this.auxiliary_request += value + ',';
    } else {
      this.auxiliary_request = this.auxiliary_request.replace(value + ',', '');
    }
  }
  setScripts(checked, value) {
    if (checked.target.checked) {
      this.scripts.push(value);
      console.log(this.scripts);

    } else {
      this.scripts.unshift(value);
    }
  }
  loadScript() {

    this.dynamicService.loadScript({ 'scripts': this.scripts }).subscribe(data => {
      this.script += data['content'];
    });
  }
  instrument() {
    this.texts.push('Instrumenting app with frida.');
    var data = {
      hash: this.id,
      frida_code: this.script,
      default_hooks: this.default_request,
      auxiliary_hooks: this.auxiliary_request,
    };
    this.dynamicService.instrument(data).subscribe(api => {
      this.texts.push('Successfully attached.');
    });
  }
  adb_cmd(event) {
    let cmd = new Cmd();
    cmd.request = event.target.value;
    this.dynamicService.adb_cmd({ cmd: event.target.value }).subscribe(api => {
      cmd.answer = api['message'];
      this.commands.push(cmd);
      event.target.value = '';
    });
  }

  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~
  // Testing Section
  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~

  installXposed() {
    this.dynamicService.activity_test({md5: this.id}).subscribe(api => {

    });
  }

  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~
  // Activity test
  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~

  activityTest() {
    this.dynamicService.activity_test({md5: this.id}).subscribe(api => {

    });
  }

  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~
  // Monkey test
  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~

  monkeyTest() {
    this.dynamicService.monkey_test({md5: this.id}).subscribe(api => {

    });
  }

  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~
  // Generate Report
  // ~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~

  makeReport() {
    this.dynamicService.generate_report({md5 : this.id}).subscribe(api => {
    });
  }
}

