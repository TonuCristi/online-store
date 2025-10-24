import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../../services/products-service';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule],
  templateUrl: './products-search.html',
  styleUrl: './products-search.scss',
})
export class ProductsSearch {
  productsService = inject(ProductsService);

  searchValue = signal<string>('');

  onSearch() {
    this.productsService.searchProducts(this.searchValue().toLowerCase()).subscribe();
  }
}
