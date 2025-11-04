import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoriesService } from '../../../../services/categories-service';
import { Button } from '../../../../common/button/button';
import { ClickOutside } from '../../../../directives/click-outside';

@Component({
  selector: 'app-categories-dropdown',
  imports: [RouterLink, Button, ClickOutside],
  templateUrl: './categories-dropdown.html',
  styleUrl: './categories-dropdown.scss',
})
export class CategoriesDropdown {
  private readonly categoriesService = inject(CategoriesService);

  isDropdownOpen = signal<boolean>(false);

  get categories() {
    return this.categoriesService.categories();
  }

  openDropdown() {
    if (!this.isDropdownOpen()) {
      this.isDropdownOpen.set(true);
    }
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
