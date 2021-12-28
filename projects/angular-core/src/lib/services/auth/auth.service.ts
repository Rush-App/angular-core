import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {BrowserLocalStorageService} from '../../ssr-services/browser-local-storage.service';
import {map} from 'rxjs/operators';
import {IBearerToken, IChangePassword, ILogin, ISetNewPassword} from '../../interfaces/auth.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(
    protected browserLocalStorage: BrowserLocalStorageService,
    protected apiService: ApiService,
    protected router: Router
  ) { }

  public login(data: ILogin): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('login'), data)
      .pipe(
        map((res: IBearerToken) => this.setToken(res.token)),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }
  public changePassword(data: IChangePassword): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('change-password'), data)
      .pipe(
        map((res: IBearerToken) => this.setToken(res.token)),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }
  public resetPassword(email: string): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('reset-password'), email)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }
  public setNewPassword(data: ISetNewPassword): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('set-password'), data)
      .pipe(
        map((res: IBearerToken) => this.setToken(res.token)),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }
  public refreshToken(): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('refresh-token'));
  }
  public getToken(): string | null {
    return this.browserLocalStorage.getItem('token');
  }
  public setToken(token: string): void {
    this.browserLocalStorage.setItem('token', token);
  }
  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  public backendLogout(): void {
    this.apiService.sendPost(this.apiService.getEndpoint('logout'))
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error))
      )
      .subscribe(
        () => {
          this.frontendLogout();
        },
        (err) => {
          return throwError(() => err);
        }
      );
  }
  public frontendLogout(): void {
    this.browserLocalStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
