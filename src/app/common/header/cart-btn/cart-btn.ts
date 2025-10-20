import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Button } from '../../button/button';

@Component({
  selector: 'app-cart-btn',
  imports: [RouterLink, CurrencyPipe, Button],
  templateUrl: './cart-btn.html',
  styleUrl: './cart-btn.scss',
})
export class CartBtn {
  isCartOpen = signal<boolean>(false);

  toggleCart() {
    this.isCartOpen.update((prev) => !prev);
  }
}
