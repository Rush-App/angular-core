import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';
import {BrowserLocalStorageService} from '../ssr-services/browser-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  protected languages: object;
  protected defaultLanguage: string;

  public constructor(
    private translateService: TranslateService,
    private browserLocalStorage: BrowserLocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject('languages') languages: object,
    @Inject('defaultLanguage') defaultLanguage: string
  ) {
    this.languages = languages;
    this.defaultLanguage = defaultLanguage;
  }

  public setAvailableLanguages(): void {
    this.translateService.addLangs(Object.keys(this.languages));

    if (isPlatformBrowser(this.platformId) && this.languages.hasOwnProperty(navigator.language)) {
      this.translateService.setDefaultLang(navigator.language);
      //@ts-ignore
    } else if (this.languages.hasOwnProperty(this.translateService.getBrowserLang())) {
      //@ts-ignore
      this.translateService.setDefaultLang(this.translateService.getBrowserLang());
    } else {
      this.translateService.setDefaultLang(this.defaultLanguage);
    }
  }
  public getInitialLanguage(): string {
    //@ts-ignore
    const langInLocalStorage: string = this.browserLocalStorage.getItem('language');
    return this.translateService.getLangs().includes(langInLocalStorage)
      ? langInLocalStorage
      : this.translateService.getDefaultLang();
  }
  public setInitialLanguage(lang?: string): void {
    //@ts-ignore
    this.currentLanguage = this.languages.hasOwnProperty(lang) ? lang : this.getInitialLanguage();
  }
  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }
  public set currentLanguage(lang: string) {
    const language = this.languages.hasOwnProperty(lang) ? lang : this.defaultLanguage;
    this.translateService.use(language);
    this.browserLocalStorage.setItem('language', language);
  }
}

