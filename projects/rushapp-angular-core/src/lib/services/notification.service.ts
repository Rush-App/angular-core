import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private duration = 3000;

  public constructor(
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  public error(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'error', duration, shouldTranslate);
  }
  public warn(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'warn', duration, shouldTranslate);
  }
  public success(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'success', duration, shouldTranslate);
  }
  private showMatSnackBar(message: string, panelClass: string, duration?: number, shouldTranslate?: boolean): void {
    if (shouldTranslate) {
      this.translateService.get(message).subscribe((translation) => {
        this.matSnackBar.open(translation, '', {panelClass: [panelClass], duration: duration || this.duration});
      });
    } else {
      this.matSnackBar.open(message, '', {panelClass: [panelClass], duration: duration || this.duration});
    }
  }
}
