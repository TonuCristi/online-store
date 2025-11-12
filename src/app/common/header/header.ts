import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartBtn } from './cart-btn/cart-btn';
import { ProductsSearch } from './products-search/products-search';
import { UserDropdown } from './user-dropdown/user-dropdown';
import { AuthService } from '../../services/auth-service';
import { Button } from '../button/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CartBtn, ProductsSearch, UserDropdown, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authService = inject(AuthService);

  get isLogged() {
    return !!this.authService.user();
  }
}
