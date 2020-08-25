import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { takeWhile, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable()
export class ReconnaissanceService {
  httpOptions = {};

  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.httpOptions = {  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() } )};
        }
      });
  }
  public getEmails(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/recon_emails?md5=` +
      md5 + '&system=android' , this.httpOptions);
  }
  public getFirebase(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/recon_firebase?md5=` +
      md5 + '&system=android', this.httpOptions);
  }
  public getUrls(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/recon_urls?md5=` + md5
      + '&system=android' , this.httpOptions);
  }
  public getTrackers(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/recon_trackers?md5=` +
      md5 + '&system=android' , this.httpOptions);
  }
  public getStrings(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/recon_strings?md5=` +
      md5 + '&type=list_dict'  + '&system=' + system, this.httpOptions);
  }
}
