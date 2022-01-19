import {Observable} from 'rxjs';
import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface IOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'response' | any;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
  withCredentials?: boolean;
}

export interface ICrud {
  index<T>(query: any): Observable<T[]>;
  indexPaginate<T>(query: any): Observable<T[]>;
  show<T>(id: number, query: any): Observable<T>;
  store<T>(data: T, options?: IOptions): Observable<T>;
  update<T>(id: number, data: T, options?: IOptions): Observable<T>;
  destroy<T>(id: number): Observable<T>;
}

export interface IGetPaginate {
  data: any[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  path: string;
  prev_page_url: string;
}
