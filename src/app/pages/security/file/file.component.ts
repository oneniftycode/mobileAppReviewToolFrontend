import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { NbDialogService } from '@nebular/theme';
import { SecurityService } from '../../../@core/utils/security.service';

@Component({
  selector: 'ngx-security-file',
  styleUrls: ['./file.component.scss'],
  templateUrl: './file.component.html',
})


export class FileComponent implements OnInit {
  id: string;
  system: string;
  childId: string;
  selectedItem: string;
  // MENU
  linkFile = false;
  // END MENY
  displayedColumnsFileAnalysis: string[] = ['finding', 'files'];
  dataSourceFileAnalysis: any; //  = new MatTableDataSource(APPPERMISSIONS_DATA);
  emptyCheck: boolean = false;

  fileAnalysis: any;
  file_context: string[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private securityService: SecurityService) {
    this.fileAnalysis = {};
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.fileAnalysis = data.fileAnalysis;
      this.dataSourceFileAnalysis = new MatTableDataSource(this.fileAnalysis.list);
      this.checkEmpty();
    });
    this.route.params.subscribe(params => {
    });
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.system = params['system'];
    });
  }
  doWhatEverOnChange() {
    // this.router.navigateByUrl(this.router.url.replace(this.childId, this.selectedItem));
    this.checkEmpty();
  }
  checkEmpty() {
    this.emptyCheck = this.dataSourceFileAnalysis.length === 0;
  }
  open(dialog: TemplateRef<any>, file) {
    this.file_context = [];
    if (this.system === 'android') {
      this.dialogService.open(dialog, { context: file });
    } else {
      file.forEach(element => {
        this.file_context.push('[ ' + element.type + ' : ' + element.file_path + ' ]');
      });
      this.dialogService.open(dialog, { context: this.file_context });
    }
  }
}
