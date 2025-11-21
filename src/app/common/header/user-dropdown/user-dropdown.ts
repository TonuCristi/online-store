import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../button/button';
import { ClickOutside } from '../../../directives/click-outside';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-user-dropdown',
  imports: [RouterLink, Button, ClickOutside],
  templateUrl: './user-dropdown.html',
  styleUrl: './user-dropdown.scss',
})
export class UserDropdown {
  private readonly authService = inject(AuthService);

  isOpen = signal<boolean>(false);

  get userRole() {
    const user = this.authService.user();

    return user && user.role;
  }

  openDropdown() {
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  logoutUser() {
    this.authService.logout();
  }
}
