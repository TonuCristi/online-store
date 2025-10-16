import { Component, computed, inject } from '@angular/core';
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
import { Button } from '../../../../common/button/button';
import { AuthService } from '../../../../services/auth-service';
import { Message } from '../../../../common/message/message';
import { getControlErrorMessage, getFormErrorMessage } from '../../../../utils/form-error.util';

@Component({
  selector: 'app-register-form',
  imports: [AuthFormWrapper, Button, ReactiveFormsModule, RouterLink, Message],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
    { validators: this.passwordMatchValidator() }
  );
  private authService = inject(AuthService);

  isRegisterLoading = computed(() => this.authService.isLoading());

  get isFormValid() {
    return this.registerForm.valid;
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value.password;
      const confirmPassword = control.value.confirmPassword;

      return password !== confirmPassword ? { passwordMatch: true } : null;
    };
  }

  getControlError(controlName: string) {
    return this.registerForm.dirty && getControlErrorMessage(this.registerForm.get(controlName));
  }

  getFormError() {
    if (this.authService.error()) {
      return this.authService.error();
    }

    if (getFormErrorMessage(this.registerForm)) {
      return getFormErrorMessage(this.registerForm);
    }

    return null;
  }

  onRegister() {
    console.log(this.registerForm);

    // if (this.isFormValid) {
    //   const email = this.registerForm.value.email!;
    //   const password = this.registerForm.value.password!;

    //   const newUser = {
    //     email,
    //     password,
    //   };

    //   this.authService.register(newUser).subscribe();
    // }
  }
}
