import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../../services/products-service';
import { Input } from '../../input/input';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule, Input],
  templateUrl: './products-search.html',
  styleUrl: './products-search.scss',
})
export class ProductsSearch {
  productsService = inject(ProductsService);
  // products = signal<Porducs>([]);

  searchValue = signal<string>('');

  onSearch() {
    this.productsService.searchProducts(this.searchValue().toLowerCase()).subscribe((result) => {
      console.log(result);
    });
  }
}
