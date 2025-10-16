import { AbstractControl, FormGroup } from '@angular/forms';

const errorMessages: Record<string, (error: any) => string> = {
  required: () => 'This field is required!',
  email: () => 'Please enter a valid email address!',
  minlength: (e) => `Minimum length is ${e.requiredLength}!`,
  passwordMatch: () => 'Passwords must match!',
} as const;

export function getControlErrorMessage(control: AbstractControl | null) {
  if (!control || !control.errors) return null;

  const errorKey = Object.keys(control.errors)[0];
  const getMessage = errorMessages[errorKey];

  return getMessage ? getMessage(control.errors[errorKey]) : null;
}

export function getFormErrorMessage(formGroup: FormGroup | null) {
  if (!formGroup || !formGroup.errors) return null;

  const errorKey = Object.keys(formGroup.errors)[0];
  const getMessage = errorMessages[errorKey];

  return getMessage ? getMessage(formGroup.errors[errorKey]) : null;
}
