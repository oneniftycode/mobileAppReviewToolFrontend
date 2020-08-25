import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable()
export class SecurityService {
  httpOptions = {};

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.httpOptions = {  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() } )};
        }
      });
  }

  public getManifestOverview(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/security_analysis/manifest_analysis?md5=` +
      md5 + '&system=' + system , this.httpOptions);
  }
  public getCodeAnalysis(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/security_analysis/code_analysis?md5=` + md5 +
      '&system=' + system, this.httpOptions);
  }
  public getFileAnalysis(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/security_analysis/file_analysis?md5=` + md5 +
      '&system=' + system , this.httpOptions);
  }
  public getBinaryAnalysis(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/security_analysis/binary_analysis?md5=` + md5 +
      '&system=' + system , this.httpOptions);
  }
  public getAppPermissions(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/security_analysis/app_permissions?md5=` + md5 +
      '&system=' + system , this.httpOptions);
  }
}
