import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserLocalStorageService {
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
