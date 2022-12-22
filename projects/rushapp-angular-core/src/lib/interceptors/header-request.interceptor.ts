import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
//@ts-ignore
import FormData from "form-data"
import {Observable} from "rxjs";

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
    let language: string|null = (this.translateService.currentLang || this.defaultLanguage);

    if (request.body instanceof FormData) {
      request = request.clone({
        setHeaders: {
          Language: language,
        },
        withCredentials: true,
      });
    } else {
      request = request.clone({
        setHeaders: {
          Language: language,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
    }

    return next.handle(request);
  }
}
