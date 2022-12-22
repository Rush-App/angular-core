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

    let browserLang: string | undefined = this.translateService.getBrowserLang();

    if (isPlatformBrowser(this.platformId) && this.languages.hasOwnProperty(navigator.language)) {
      this.translateService.setDefaultLang(navigator.language);
    } else if (browserLang && this.languages.hasOwnProperty(browserLang)) {
      this.translateService.setDefaultLang(browserLang);
    } else {
      this.translateService.setDefaultLang(this.defaultLanguage);
    }
  }
  public getInitialLanguage(): string {
    const langInLocalStorage: string|null = this.browserLocalStorage.getItem('language');

    if (langInLocalStorage && this.translateService.getLangs().includes(langInLocalStorage)) {
      return langInLocalStorage;
    }

    return this.translateService.getDefaultLang();
  }
  public setInitialLanguage(lang?: string): void {
    this.currentLanguage = lang && this.languages.hasOwnProperty(lang)
      ? lang
      : this.getInitialLanguage();
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

