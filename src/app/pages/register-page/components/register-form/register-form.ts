import { Component, computed, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthFormWrapper } from '../../../../common/auth/auth-form-wrapper/auth-form-wrapper';
import { AuthService } from '../../../../services/auth-service';
import { Message } from '../../../../common/message/message';
import { getControlErrorMessage, getFormErrorMessage } from '../../../../utils/form-error.util';
import { Button } from '../../../../common/button/button';
import { FormField } from '../../../../common/form-field/form-field';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, AuthFormWrapper, Message, Button, FormField],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm implements OnDestroy {
  private readonly authService = inject(AuthService);

  isRegisterLoading = computed(() => this.authService.isLoading());

  readonly inputs = [
    {
      label: 'Email',
      for: 'email',
      type: 'text',
      placeholder: 'Email...',
      name: 'email',
    },
    {
      label: 'Password',
      for: 'password',
      type: 'password',
      placeholder: 'Password...',
      name: 'password',
    },
    {
      label: 'Confirm password',
      for: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password...',
      name: 'confirmPassword',
    },
  ];

  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
    },
    { validators: this.passwordMatchValidator() }
  );

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return password !== confirmPassword ? { passwordMatch: true } : null;
    };
  }

  ngOnDestroy(): void {
    this.authService.clearError();
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  getControlError(controlName: string) {
    const control = this.registerForm.get(controlName);

    return control && control.dirty && getControlErrorMessage(control);
  }

  getFormError() {
    if (this.passwordControl?.invalid || this.confirmPasswordControl?.invalid) {
      return null;
    }

    if (this.authService.error()) {
      return this.authService.error();
    }

    return getFormErrorMessage(this.registerForm);
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  onRegister() {
    if (!this.isFormValid) return;

    const { email, password } = this.registerForm.getRawValue();

    const newUser = {
      email,
      password,
    };

    this.authService.register(newUser).subscribe();
  }
}
