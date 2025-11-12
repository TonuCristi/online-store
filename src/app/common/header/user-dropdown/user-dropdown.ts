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
