import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductsFilters } from './components/products-filters/products-filters';
import { ProductsSort } from './components/products-sort/products-sort';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products-service';
import { Spinner } from '../../common/spinner/spinner';
import { CategoriesService } from '../../services/categories-service';
import { Category } from '../../models/category.model';
import { ProductsList } from './components/products-list/products-list';
import { PER_PAGE } from './products.constants';

@Component({
  selector: 'app-products-page',
  imports: [ProductsFilters, ProductsSort, Spinner, ProductsList],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  products = signal<Product[]>([]);
  category = signal<Category | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string>('');
  currentPage = signal<number>(0);

  ngOnInit(): void {
    const categoryId = this.activatedRoute.snapshot.params['categoryId'];

    const productsParams = {
      categoryId,
      currentPage: 0,
      perPage: PER_PAGE,
    };

    forkJoin({
      productsResult: this.productsService.getProducts(productsParams),
      categoryResult: this.categoriesService.getCategory(categoryId),
    }).subscribe({
      next: ({ productsResult, categoryResult }) => {
        this.updateProducts(productsResult);
        this.category.set(categoryResult);
      },
      error: () => this.error.set('Something went wrong!'),
      complete: () => this.isLoading.set(false),
    });
  }

  incrementPage() {
    this.currentPage.update((prev) => prev + 1);
  }

  decrementPage() {
    this.currentPage.update((prev) => prev - 1);
  }

  updateProducts(newProducts: Product[]) {
    this.products.set(newProducts);
  }
}
