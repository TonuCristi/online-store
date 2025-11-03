import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of, tap } from 'rxjs';
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
export class ProductsSearch implements OnDestroy {
  productsService = inject(ProductsService);

  searchValue = signal<string>('');
  searchedProducts = signal<Product[]>([]);
  isSearchLoading = signal<boolean>(false);
  searchError = signal<string>('');
  isSearchResultsOpen = signal<boolean>(false);

  ngOnDestroy(): void {}

  openSearchResults() {
    console.log('open');
    this.isSearchResultsOpen.set(true);
  }

  closeSearchResults() {
    console.log('close');
    this.isSearchResultsOpen.set(false);
    this.searchValue.set('');
    this.searchedProducts.set([]);
    this.searchError.set('');
    // this.productsService.searchProducts(this.searchValue().toLowerCase()).
  }

  onSearch() {
    this.isSearchLoading.set(true);
    this.productsService.searchProducts(this.searchValue().toLowerCase()).subscribe({
      next: (result) => {
        this.searchedProducts.set(result);
      },
      error: () => {
        this.searchError.set('Something went wrong!');
      },
      complete: () => {
        this.isSearchLoading.set(false);
      },
    });
  }
}
