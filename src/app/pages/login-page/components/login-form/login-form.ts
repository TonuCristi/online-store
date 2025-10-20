import { Component, computed, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../../services/auth-service';
import { getControlErrorMessage, getFormErrorMessage } from '../../../../utils/form-error.util';
import { AuthFormWrapper } from '../../../../common/auth/auth-form-wrapper/auth-form-wrapper';
import { Message } from '../../../../common/message/message';
import { Button } from '../../../../common/button/button';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, AuthFormWrapper, Message, Button],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm implements OnDestroy {
  private readonly authService = inject(AuthService);

  isLoginLoading = computed(() => this.authService.isLoading());

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
  ];

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnDestroy(): void {
    this.authService.clearError();
  }

  get isFormValid() {
    return this.loginForm.valid;
  }

  getControlError(controlName: string) {
    const control = this.loginForm.get(controlName);

    return control && control.dirty && getControlErrorMessage(control);
  }

  getFormError() {
    return this.authService.error() ?? getFormErrorMessage(this.loginForm);
  }

  onLogin() {
    if (!this.isFormValid) return;

    const { email, password } = this.loginForm.getRawValue();

    const credentials = {
      email,
      password,
    };

    this.authService.login(credentials).subscribe();
  }
}
