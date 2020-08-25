import { Component, EventEmitter, Output, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { UploadTabComponent } from './tab/tab.component';
import { UploadService } from './upload.service';
import { RecentScanService, RecentScan } from '../../@core/utils/recent-scans';
import { takeWhile, map } from 'rxjs/operators';
import { HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'ngx-upload-drapndrop',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public files: NgxFileDropEntry;
  recentScans: RecentScan[];
  close: boolean;
  formData: FormData;
  humanizeBytes: Function;
  uploadServiceObservable: any;
  progress: number;
  dragOver: boolean;
  constructor(private uploadService: UploadService,
    private dialogService: NbDialogService,
    private recentScanService: RecentScanService,
    private authService: NbAuthService) {

  }

  ngOnInit() {
    this.recentScanService.getValue().subscribe((value) => {
      this.recentScans = value;
    });

  }

  public dropped(files: NgxFileDropEntry) {
    this.files = files[0];
    // Is it a file?
    if (this.files.fileEntry.isFile) {
      const fileEntry = this.files.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        ///  var formData: FormData = new FormData();
        const formData = new FormData();
        formData.append('file', file, this.files.relativePath);
        this.open();

        const uploadServiceObservable = this.recentScanService.addRecentScans(formData).subscribe((events: HttpEvent<any>) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.uploadService.setValue(Math.round(100 * events.loaded / events.total) * 0.95);

          } else if (events instanceof HttpResponse) {
            let recentScan: RecentScan = <RecentScan>events.body;
            var foundIndex = this.recentScans.findIndex(x => x.md5 == recentScan.md5);
            if (foundIndex != -1) {
              this.recentScans[foundIndex] = recentScan;
            } else {
              this.recentScans.unshift(recentScan);
            }
            this.recentScanService.setValue(this.recentScans);
            this.uploadService.setValue(100);
            this.uploadService.setCloseValue(true);
          }
        });
        this.uploadService.getCloseValue().subscribe((value) => {

          if (value) {
            uploadServiceObservable.unsubscribe();
            this.files = null;
          }
        });
      });


    } else {

    }

  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }
  open() {
    this.dialogService.open(UploadTabComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false
    });

  }

}
