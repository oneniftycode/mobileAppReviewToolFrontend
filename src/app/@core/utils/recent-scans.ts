import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export class RecentScan {
  icon_url: string;
  file_name: string;
  system: string;
  date: string; // Dec, 20, 2018
  report_status: string;
  trackers_detected: number;
  security_score: number;
  total_issues: number;
  cvss_high: number;
  cvss_mid: number;
  cvss_low: number;
  size: string;
  md5: string;
  sha1: string;
  sha256: string;
  app_name: string;
  package_name: string;
  version_name: string;
  cvss_score: number;
  issues_high: number;
  issues_mid: number;
  issues_low: number;

  charts: any;
  /** added **/

  /** end added **/

}

@Injectable()
export class RecentScanService {
  recentScans: BehaviorSubject<RecentScan[]>;
  httpOptions = {};
  httpOptionsUpload = {};

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.recentScans = new BehaviorSubject<RecentScan[]>([]);
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // tslint:disable-next-line:max-line-length
          this.httpOptionsUpload = {  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() } ), reportProgress: true, observe: 'events' };
          this.httpOptions = {  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() } )};
        }
      });
  }

  setValue(newValue): void {
    this.recentScans.next(newValue);
  }
  getValue(): Observable<RecentScan[]> {
    return this.recentScans.asObservable();
  }

  public getRecentScans() {
    return this.http.get(`${environment.apiUrl}/api/v1/recent_scans`, this.httpOptions);
  }

  public addRecentScans(data) {
    return this.http.post(`${environment.apiUrl}/api/v1/upload_scan`, data, this.httpOptionsUpload);
  }
  public deleteScan(data) {
    return this.http.post(`${environment.apiUrl}/api/v1/delete_scan`, data, this.httpOptionsUpload);
  }
  public get_just_one(md5) { // this was unused.
    return this.http.get(`${environment.apiUrl}/api/v1/get_md5?md5=${md5}`, this.httpOptions);
  }
}
