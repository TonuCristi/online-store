import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from '../../../../common/button/button';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {}
