import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerValidationFormService {
  private serverValidationErrors: object = {};
  private duration = 2000;
  private error: object = {serverValidationError: true};

  public isServerValidationError(formControlName: string): boolean {
    return this.serverValidationErrors.hasOwnProperty(formControlName);
  }
  public getServerValidationError(formControlName: string): string {
    return this.serverValidationErrors[formControlName as keyof {}][0];
  }
  public showErrors(error: object, formGroupControls: any, duration?: number): void {
    this.setServerValidationErrors(error);
    this.setValidationErrorsToForm(formGroupControls, this.error);
    setTimeout(() =>
        this.removeServerValidationErrors(formGroupControls),
      duration || this.duration
    );
  }
  private setServerValidationErrors(error: object): void {
    this.serverValidationErrors = error;
  }
  private setValidationErrorsToForm(formGroupControls: any, error: object | null): void {
    for (const key in formGroupControls) {
      if (this.serverValidationErrors.hasOwnProperty(key)) {
        formGroupControls[key].setErrors(error);
      }
    }
  }
  private removeServerValidationErrors(formGroupControls: any): void {
    this.setValidationErrorsToForm(formGroupControls, null);
    this.serverValidationErrors = {};
  }
}
