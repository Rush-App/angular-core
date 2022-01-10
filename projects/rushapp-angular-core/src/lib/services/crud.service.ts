import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ICrud, IGetPaginate} from '../interfaces/crud.interface';
import {map, catchError} from 'rxjs/operators';
import * as _ from 'lodash-es';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract modelClass: any;
  private isIndexRequestCompleted = true;
  private isIndexPaginateRequestCompleted = true;
  private isShowRequestCompleted = true;
  private isStoreRequestCompleted = true;
  private isUpdateRequestCompleted = true;
  private isDestroyRequestCompleted = true;

  public index<T>(parameters?: any): Observable<any> {
    this.setIndexRequestInProgress();
    return this.sendGet(this.getEndpoint(this.namespace), {params: parameters})
      .pipe(
        map((res: Response) => {
          this.setIndexRequestCompleted();
          return this.buildModelFromArray(res);
        }),
        catchError((error: HttpErrorResponse) => {
          this.setIndexRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }
  public indexPaginate<T>(parameters?: any): Observable<any> {
    this.setIndexPaginateRequestInProgress();
    return this.sendGet(this.getEndpoint(this.namespace), {params: parameters})
      .pipe(
        map((res: Response) => {
          this.setIndexPaginateRequestCompleted();
          return this.buildModelFromPaginateData(res);
        }),
        catchError((error: HttpErrorResponse) => {
          this.setIndexPaginateRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }
  public show<T>(id: number, parameters?: any): Observable<any> {
    this.setShowRequestInProgress();
    return this.sendGet(this.getEndpoint(this.namespace + '/' + id), {params: parameters})
      .pipe(
        map((res: Response) => {
          this.setShowRequestCompleted();
          return this.buildModel(res);
        }),
        catchError((error: HttpErrorResponse) => {
          this.setShowRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }
  public store<T>(data: T, options?: T): Observable<any> {
    this.setStoreRequestInProgress();
    return this.sendPost(this.getEndpoint(this.namespace), data, options)
      .pipe(
        map((res: Response) => {
          this.setStoreRequestCompleted();
          return this.buildModel(res);
        }),
        catchError((error: HttpErrorResponse) => {
          this.setStoreRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }
  public update<T>(id: number, data: T, options?: T): Observable<any> {
    this.setUpdateRequestInProgress();
    return this.sendPut(this.getEndpoint(this.namespace + '/' + id), data, options)
      .pipe(
        map((res: Response) => {
          this.setUpdateRequestCompleted();
          return this.buildModel(res);
        }),
        catchError((error: HttpErrorResponse) => {
          this.setUpdateRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }
  public destroy<T>(id: number): Observable<any> {
    this.setDestroyRequestInProgress();
    return this.sendDelete(this.getEndpoint(this.namespace + '/' + id))
      .pipe(
        map((res: ArrayBuffer) => {
          this.setDestroyRequestCompleted();
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          this.setDestroyRequestCompleted();
          return this.httpResponseErrorHandler(error);
        })
      );
  }

  public buildModelFromArray<T>(res: any): any {
    return res.map((item: any) => {
      return Array.isArray(item) === true
        ? this.buildModelFromArray(item)
        : this.buildModel<T>(_.omitBy(item, _.isNil));
    });
  }
  public buildModelFromPaginateData<T>(res: any): any {
    const paginatedData: IGetPaginate = res.data.map((item: T) => this.buildModel<T>(item));
    return {...res, data: paginatedData};
  }
  public buildModel<T>(data: any): T {
    return new this.modelClass(data);
  }

  public setIndexRequestCompleted(): void { this.isIndexRequestCompleted = true; }
  public setIndexRequestInProgress(): void { this.isIndexRequestCompleted = false; }
  public getIsIndexRequestCompleted(): boolean {
    return this.isIndexRequestCompleted;
  }
  public setIndexPaginateRequestCompleted(): void { this.isIndexPaginateRequestCompleted = true; }
  public setIndexPaginateRequestInProgress(): void { this.isIndexPaginateRequestCompleted = false; }
  public getIsIndexPaginateRequestCompleted(): boolean {
    return this.isIndexPaginateRequestCompleted;
  }
  public setShowRequestCompleted(): void { this.isShowRequestCompleted = true; }
  public setShowRequestInProgress(): void { this.isShowRequestCompleted = false; }
  public getIsShowRequestCompleted(): boolean {
    return this.isShowRequestCompleted;
  }
  public setStoreRequestCompleted(): void { this.isStoreRequestCompleted = true; }
  public setStoreRequestInProgress(): void { this.isStoreRequestCompleted = false; }
  public getIsStoreRequestCompleted(): boolean {
    return this.isStoreRequestCompleted;
  }
  public setUpdateRequestCompleted(): void { this.isUpdateRequestCompleted = true; }
  public setUpdateRequestInProgress(): void { this.isUpdateRequestCompleted = false; }
  public getIsUpdateRequestCompleted(): boolean {
    return this.isUpdateRequestCompleted;
  }
  public setDestroyRequestCompleted(): void { this.isDestroyRequestCompleted = true; }
  public setDestroyRequestInProgress(): void { this.isDestroyRequestCompleted = false; }
  public getIsDestroyRequestCompleted(): boolean {
    return this.isDestroyRequestCompleted;
  }
}
