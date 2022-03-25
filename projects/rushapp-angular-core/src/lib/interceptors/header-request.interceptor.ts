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
    let language: string = (this.translateService.currentLang || this.defaultLanguage);
    if (request.params.get('set_header_language')) {
      //@ts-ignore
      language = request.params.get('set_header_language');
    } else if (request.body?.set_header_language) {
      language = request.body.set_header_language;
    }

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
