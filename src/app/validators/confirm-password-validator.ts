import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): (abstractControl: AbstractControl) => ValidationErrors | null {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const formGroup = abstractControl as FormGroup;
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      matchingControl.setErrors(null);
      return null;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
      return { confirmPasswordValidator: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
