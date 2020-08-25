import { Component, EventEmitter, Output, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UploadService } from '../upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-upload-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class UploadTabComponent implements OnInit{

  progress: number;
  closeObesrvable: any;
  constructor(protected dialogRef: NbDialogRef<UploadTabComponent>, private uploadService: UploadService) {

  }
  ngOnInit(){
    this.uploadService.getValue().subscribe((value) => {
      this.progress = value;
    });
    this.closeObesrvable = this.uploadService.getCloseValue().subscribe((value) => {
      if(value){
        this.dialogRef.close();
        this.uploadService.setCloseValue(false);
      }
    });
    (<Observable<MouseEvent>> this.dialogRef.onBackdropClick).subscribe((value) => {
      if(value.type === "click"){
        this.close();
      }
    });
  }
  close() {
    this.uploadService.setCloseValue(true);
  }

}
