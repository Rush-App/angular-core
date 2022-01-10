import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SeoOptimizationService {
  protected metaTagImage: string;
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('metaTagImage') metaTagImage: string
  ) {
    this.metaTagImage = metaTagImage;
  }

  setAllMetaTag(metaTitle: string, metaDescription: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setMetaTag(metaTitle, metaDescription);
      this.setOgMetaTag(metaTitle, metaDescription);
    }
  }
  setMetaTag(metaTitle: string, metaDescription: string): void {
    this.titleService.setTitle(this.translateService.instant(metaTitle));
    this.metaService[this.getMetaMethod('name=\'description\'')](
      { name: 'description', content: this.translateService.instant(metaDescription) },
    );
  }
  setOgMetaTag(metaTitle: string, metaDescription: string): void {
    this.metaService[this.getMetaMethod('name=\'og:locale\'')](
      { name: 'og:locale', content: this.translateService.currentLang },
    );
    this.metaService[this.getMetaMethod('name=\'og:title\'')](
      { name: 'og:title', content: this.translateService.instant(metaTitle) },
    );
    this.metaService[this.getMetaMethod('name=\'og:description\'')](
      { name: 'og:description', content: this.translateService.instant(metaDescription) },
    );
    this.metaService[this.getMetaMethod('name=\'og:url\'')](
      { name: 'og:url', content: window.location.href },
    );
    this.metaService[this.getMetaMethod('name=\'og:image\'')](
      { name: 'og:image', content: this.metaTagImage },
    );
  }
  getMetaMethod(tagName: string): 'updateTag' | 'addTag' {
    return this.isIssetMetaTag(tagName) ? 'updateTag' : 'addTag';
  }
  isIssetMetaTag(tagName: string): HTMLMetaElement | null {
    return this.metaService.getTag(tagName);
  }
}
