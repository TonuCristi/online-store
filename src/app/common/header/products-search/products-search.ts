import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { ProductsService } from '../../../services/products-service';
import { Input } from '../../input/input';
import { Spinner } from '../../spinner/spinner';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule, RouterLink, CurrencyPipe, Input, Spinner],
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

  toogleSearchResults() {
    this.isSearchResultsOpen.update((prev) => !prev);
  }

  onSearch() {
    this.isSearchLoading.set(true);
    this.productsService
      .searchProducts(this.searchValue().toLowerCase())
      .pipe(
        tap((result) => {
          this.searchedProducts.set(result);
        }),
        catchError(() => {
          this.searchError.set('Something went wrong!');

          return of([]);
        }),
        finalize(() => this.isSearchLoading.set(false))
      )
      .subscribe();
  }
}
