import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../common/button/button';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  host: {
    '[class.light]': 'variant() === "light"',
    '[class.dark]': 'variant() === "dark"',
  },
})
export class ProductCard {
  variant = input.required<'light' | 'dark'>();

  addToCard(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    console.log('asd');
  }
}
