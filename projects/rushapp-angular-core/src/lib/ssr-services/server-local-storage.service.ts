import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerLocalStorageService {
  private store: {[key: string]: string} = {};

  public getItem(key: string): string | null {
    return this.store[key];
  }
  public setItem(key: string, value: string): void {
    this.store[key] = value;
  }
  public removeItem(key: string): void {
    delete this.store[key];
  }
}
