import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class HeaderRequestInterceptor implements HttpInterceptor {
  protected defaultLanguage: string;
  public constructor(
    private translateService: TranslateService,
    @Inject('defaultLanguage') defaultLanguage: string
  ) {
    this.defaultLanguage = defaultLanguage;
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.body instanceof FormData) {
      request = request.clone({
        setHeaders: {
          Language: this.translateService.currentLang || this.defaultLanguage,
        },
        withCredentials: true,
      });
    } else {
      request = request.clone({
        setHeaders: {
          Language: this.translateService.currentLang || this.defaultLanguage,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
    }

    return next.handle(request);
  }
}
