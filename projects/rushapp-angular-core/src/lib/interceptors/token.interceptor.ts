import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {IBearerToken} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  public constructor(
    private authService: AuthService,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      // @ts-ignore
      switchMap((res: IBearerToken) => {
        if (res.token) {
          this.authService.setToken(res.token);
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + res.token
            }
          });
          return next.handle(request);
        } else {
          this.authService.frontendLogout();
        }
      }),
      catchError(err => {
        this.authService.frontendLogout();
        return throwError(err);
      })
    );
  }
}
