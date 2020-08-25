import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class DynamicService {
  httpOptions = {};
  httpOptionsUpload: {
    headers?: HttpHeaders,
    observe?: 'body',
    params?: HttpParams,
    reportProgress?: boolean,
    responseType: 'blob',
    withCredentials?: boolean,
  };
  token: any;
  constructor(private authService: NbAuthService, private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.httpOptionsUpload = {
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() }),
            responseType: 'blob',
          };
          this.httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token.getValue() }) };
        }
      });
  }

  public getSteam(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/stream_file?md5=` + md5,
      [], this.httpOptionsUpload); // .pipe(catchError(this.parseErrorBlob));
  }
  parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();

    const obs = Observable.create((observer: any) => {
      reader.onloadend = (e) => {
        if (reader.result instanceof ArrayBuffer) {
        } else {
          observer.error(JSON.parse(reader.result));
        }
        observer.complete();
      };
    });
    reader.readAsText(err.error.text);

    return obs;
  }
  public startSteam(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/screen_cast?md5=` + md5, [], this.httpOptions);
  }
  public touch(md5, data) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/screen_touch?md5=` + md5, data, this.httpOptions);
  }
  public init(md5, system) {
    return this.http.get(`${environment.apiUrl}/api/v1/interactive/init?md5=` + md5 + '&system=' + system,
      this.httpOptions);
  }
  public instrument(data) {
    return this.http.post(`${environment.apiUrl}/api/v1/insteractive/instrument_frida`, data, this.httpOptions);
  }
  public loadScript(data) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/get_script`, data, this.httpOptions);
  }

  public adb_cmd(data) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/adb`, data, this.httpOptions);
  }

  public generate_report(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/report`, md5, this.httpOptions);
  }
  public install_xposed(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/install_xposed`, md5, this.httpOptions);
  }
  public monkey_test(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/monkey_test`, md5, this.httpOptions);
  }
  public activity_test(md5) {
    return this.http.post(`${environment.apiUrl}/api/v1/interactive/activity_test`, md5, this.httpOptions);
  }
}
