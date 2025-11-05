import { Component, input, signal } from '@angular/core';

import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../../models/product.model';
import { Pagination } from '../../../../common/pagination/pagination';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, Pagination],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  readonly perPage = 10;

  products = input.required<Product[]>();

  currentPage = signal<number>(0);

  nextPage() {
    this.currentPage.update((prev) => prev + 1);

    console.log(this.currentPage());
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((prev) => prev - 1);
    }

    console.log(this.currentPage());
  }
}
