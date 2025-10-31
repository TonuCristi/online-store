import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoriesService } from '../../../../services/categories-service';
import { Button } from '../../../../common/button/button';

@Component({
  selector: 'app-categories-dropdown',
  imports: [RouterLink, Button],
  templateUrl: './categories-dropdown.html',
  styleUrl: './categories-dropdown.scss',
})
export class CategoriesDropdown {
  private readonly categoriesService = inject(CategoriesService);

  isDropdownOpen = signal<boolean>(false);

  get categories() {
    return this.categoriesService.categories();
  }

  toggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
  }
}
