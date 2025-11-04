import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Button } from '../../button/button';
import { ClickOutside } from '../../../directives/click-outside';

@Component({
  selector: 'app-cart-btn',
  imports: [RouterLink, CurrencyPipe, Button, ClickOutside],
  templateUrl: './cart-btn.html',
  styleUrl: './cart-btn.scss',
})
export class CartBtn {
  isCartOpen = signal<boolean>(false);

  openCart() {
    if (!this.isCartOpen()) {
      this.isCartOpen.set(true);
    }
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
}
