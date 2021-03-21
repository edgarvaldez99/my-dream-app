import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (abstractControl: AbstractControl) => {
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
