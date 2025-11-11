import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Button } from '../../button/button';
import { ClickOutside } from '../../../directives/click-outside';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-cart-btn',
  imports: [RouterLink, CurrencyPipe, Button, ClickOutside],
  templateUrl: './cart-btn.html',
  styleUrl: './cart-btn.scss',
})
export class CartBtn {
  private readonly cartService = inject(CartService);

  isCartOpen = signal<boolean>(false);

  get cartItemsCount() {
    return this.cartService.cartItemsCount();
  }

  openCart() {
    if (!this.isCartOpen()) {
      this.isCartOpen.set(true);
    }
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
}
