import {Inject, Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IOptions} from '../interfaces/crud.interface';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiEndpoint: string;
  public constructor(
    protected http: HttpClient,
    protected notificationService: NotificationService,
    @Inject('apiEndpoint') apiEndpoint: string
  ) {
    this.apiEndpoint = apiEndpoint;
  }

  public getEndpoint(route: string): string {
    return this.apiEndpoint + route;
  }
  public sendGet(url: string, options: IOptions = {}): Observable<any> {
    return this.http.get(url, options);
  }
  public sendPost(url: string, data: any = {}, options: IOptions = {}): Observable<any> {
    return this.http.post(url, data, options);
  }
  public sendPut(url: string, data: any = {}, options: IOptions = {}): Observable<any> {
    return this.http.put(url, data, options);
  }
  public sendDelete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(url, options);
  }

  public httpResponseErrorHandler(response: HttpErrorResponse): Observable<never> {
    if (response.status !== 422 && response.status > 400) {
      const message = response.error;
      this.notificationService.error(
        `${response.status} - ${message}`,
        undefined,
        true
      );
    } else {
      this.notificationService.error(
        'Unknown error from server',
        undefined,
        true
      );
    }
    return throwError(() => response);
  }
}
