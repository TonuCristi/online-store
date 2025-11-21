import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { ProductsService } from '../../../services/products-service';
import { Input } from '../../input/input';
import { Spinner } from '../../spinner/spinner';
import { Product } from '../../../models/product.model';
import { ClickOutside } from '../../../directives/click-outside';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule, RouterLink, CurrencyPipe, Input, Spinner, ClickOutside],
  templateUrl: './products-search.html',
  styleUrl: './products-search.scss',
})
export class ProductsSearch {
  productsService = inject(ProductsService);

  searchValue = signal<string>('');
  searchedProducts = signal<Product[]>([]);
  isSearchLoading = signal<boolean>(false);
  searchError = signal<string>('');
  isSearchResultsOpen = signal<boolean>(false);

  openSearchResults() {
    if (!this.isSearchResultsOpen()) {
      this.isSearchResultsOpen.set(true);
    }
  }

  closeSearchResults() {
    if (!this.isSearchLoading()) {
      this.isSearchResultsOpen.set(false);
      this.searchValue.set('');
      this.searchedProducts.set([]);
      this.searchError.set('');
    }
  }

  onSearch() {
    this.isSearchLoading.set(true);
    this.productsService.searchProducts(this.searchValue().toLowerCase()).subscribe({
      next: (result) => {
        this.searchedProducts.set(result);
        this.isSearchLoading.set(false);
      },
      error: () => {
        this.searchError.set('Something went wrong!');
        this.isSearchLoading.set(false);
      },
    });
  }
}
