import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  /**
   * Function to control if passwords match
   */
  static matchPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordField)?.value;
      const confirmPassword = formGroup.get(confirmPasswordField)?.value;
  
      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }
}