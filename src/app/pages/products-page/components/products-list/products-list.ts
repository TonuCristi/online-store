import { Component, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../../models/product.model';
import { Pagination } from '../../../../common/pagination/pagination';
import { ProductsService } from '../../../../services/products-service';
import { Spinner } from '../../../../common/spinner/spinner';
import { PER_PAGE } from '../../products.constants';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, Pagination, Spinner],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  products = input.required<Product[]>();
  currentPage = input.required<number>();
  updateProducts = output<Product[]>();
  incrementPage = output();
  decrementPage = output();

  isLoading = signal<boolean>(false);
  error = signal<string>('');

  loadProducts() {
    this.isLoading.set(true);
    const categoryId = this.activatedRoute.snapshot.params['categoryId'];

    const productsParams = {
      categoryId,
      currentPage: this.currentPage(),
      perPage: PER_PAGE,
    };

    this.productsService.getProducts(productsParams).subscribe({
      next: (productsResult) => {
        console.log(productsResult);

        // this.updateProducts.emit(productsResult);
      },
      error: () => this.error.set('Something went wrong!'),
      complete: () => this.isLoading.set(false),
    });
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.decrementPage.emit();
      this.loadProducts();
    }
  }

  nextPage() {
    this.incrementPage.emit();
    this.loadProducts();
  }
}
