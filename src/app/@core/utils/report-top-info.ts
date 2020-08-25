import { Injectable } from '@angular/core';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export class RecentScan {
  image_link: string;
  app_name: string;
  file_name: string;
  system: string;
  timestamp: string;
  timestamp_formated: string;
  md5: string;
  package_name: string;
  version_name: string;
  cvss_score: number;
  total_issues: number;
  issue_high: number;
  issue_medium: number;
  issue_low: number;
  security_score: number;
  tracekrs_detection: number;
  status: string; // good bad
  /** added **/

  /** end added **/

}

@Injectable()
export class ReportTopInfoService {
  httpOptions = {};
  httpOptionsDownload = {};

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() }) };
          this.httpOptionsDownload = { responseType: 'arraybuffer' ,
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue()}) , observe: 'events'};
        }
      });
  }

  public getTopInfo(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/app_info?md5=` + md5 + '&system=' + system, this.httpOptions);
  }

  public getAppStoreInfo(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/appstore_info?md5=` + md5 + '&system=' + system,
      this.httpOptions);
  }
  public getSignerCertificate(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/signer_certificate?md5=` + md5 + '&system=' + system,
      this.httpOptions);
  }
  public getDownload(md5, type) {
    return this.http.get(`${environment.apiUrl}/api/v1/generate_downloads?md5=` + md5 + '&type=' + type,
      this.httpOptionsDownload);

  }
  public getSamali(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/code/smali?md5=` + md5, this.httpOptions);
  }
  public getJava(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/code/java?md5=` + md5 + '&type=apk', this.httpOptions);
  }
  public getManifest(md5, type) {
    return this.http.get(`${environment.apiUrl}/api/v1/code/manifest?md5=` + md5 + '&type=' + type + '&bin=1',
      this.httpOptions);
  }

}
