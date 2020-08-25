import { Injectable } from '@angular/core';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable()
export class SummaryService {
  httpOptions = {};

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() }) };
        }
      });
  }

  public getSecurityOverview(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/security_overview?md5=` +
      md5 + '&system=' + system, this.httpOptions);
  }
  public getMalwareOverview(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/malware_overview?md5=` +
      md5 + '&system=' + system, this.httpOptions);
  }
  public getDomainAnalysis(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/domain_analysis_country?md5=` +
      md5 + '&system=' + system, this.httpOptions);
  }
  public getDomainAnalysisCountry(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/domain_analysis_country?md5=` +
      md5 + '&system=' + system, this.httpOptions);
  }
  public getComponentActivities(md5, page = 1) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/components/activities?md5=` +
      md5 + '&system=android' + '&page=' + page, this.httpOptions);
  }
  public getComponentServices(md5, page = 1) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/components/services?md5=` +
      md5 + '&system=android' + '&page=' + page, this.httpOptions);
  }
  public getComponentReceivers(md5, page = 1) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/components/receivers?md5=` +
      md5 + '&system=android' + '&page=' + page, this.httpOptions);
  }
  public getComponentProviders(md5, page = 1) {
    return this.http.get(`${environment.apiUrl}/api/v1/summary/components/providers?md5=` +
      md5 + '&system=android' + '&page=' + page, this.httpOptions);
  }
}
