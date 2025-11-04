import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../common/button/button';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  addToCard(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    console.log('asd');
  }
}
