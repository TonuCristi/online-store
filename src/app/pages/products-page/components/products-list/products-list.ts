import { Component, input } from '@angular/core';

import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../../models/product.model';
import { Spinner } from '../../../../common/spinner/spinner';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, Spinner],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  products = input.required<Product[]>();
  isProductsLoading = input.required<boolean>();
}
