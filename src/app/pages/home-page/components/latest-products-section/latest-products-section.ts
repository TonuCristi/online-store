import { Component, input } from '@angular/core';

import { ProductCard } from '../../../products-page/components/product-card/product-card';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-latest-products-section',
  imports: [ProductCard],
  templateUrl: './latest-products-section.html',
  styleUrl: './latest-products-section.scss',
})
export class LatestProductsSection {
  latestProducts = input.required<Product[]>();
}
