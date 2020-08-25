import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from '../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ReportMenuService } from '../../@core/utils/report-menu.service';

@Component({
  selector: 'ngx-support',
  styleUrls: ['./support.component.scss'],
  templateUrl: './support.component.html',
})

export class SupportComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();
  title: string;
  userPictureOnly: boolean = false;
  user: any;
  constructor(private userService: UserData,private reportMenuService: ReportMenuService,) {
    this.title = "Support";
  }
  ngOnInit(){
    this.reportMenuService.setValue("expanded");

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);
  }
  ngOnDestroy() {
    this.reportMenuService.setValue("collapsed");
    this.destroy$.next();
    this.destroy$.complete();
  }
}
