import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NbSidebarService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

import { SecurityService } from '../../../@core/utils/security.service';


export interface Emails {
  emails: string;
  file: string;
}


@Component({
  selector: 'ngx-reconnaisance-email',
  styleUrls: ['./email.component.scss'],
  templateUrl: './email.component.html',
})


export class EmailComponent implements OnInit {
  id: string;
  system: string;
  displayedColumnsEmails: string[] = ['emails', 'path'];
  dataSourceEmails: any;
  emails: any;
  childId: string;
  selectedItem: string;
  emptyCheck: boolean = false;

  constructor(private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private router: Router,
  ) {
    this.emails = {};
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.emails = data.emails;
      this.dataSourceEmails = new MatTableDataSource(this.emails.list);
      if (this.dataSourceEmails.filteredData.length === 0)
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
