import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalLinkService {
  public constructor(@Inject(DOCUMENT) private dom: any) { }

  public setCanonicalURL(url?: string): void {
    const canURL = url === undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
