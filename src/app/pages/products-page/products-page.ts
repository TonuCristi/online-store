import { Component, inject, OnInit, signal } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductsFilters } from './components/products-filters/products-filters';
import { ProductsSort } from './components/products-sort/products-sort';
import { ProductCard } from './components/product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products-service';
import { Spinner } from '../../common/spinner/spinner';
import { CategoriesService } from '../../services/categories-service';
import { Category } from '../../models/category.model';
import { Pagination } from '../../common/pagination/pagination';
import { ProductsList } from './components/products-list/products-list';

@Component({
  selector: 'app-products-page',
  imports: [ProductsFilters, ProductsSort, Spinner, ProductsList],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private activatedRoute = inject(ActivatedRoute);

  products = signal<Product[]>([]);
  category = signal<Category | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    const categoryId = this.activatedRoute.snapshot.params['categoryId'];

    const productsParams = {
      categoryId,
    };

    combineLatest([
      this.productsService.getProducts(productsParams),
      this.categoriesService.getCategory(categoryId),
    ]).subscribe({
      next: ([productsResult, categoryResult]) => {
        this.products.set(productsResult);
        this.category.set(categoryResult);
      },
      error: () => this.error.set('Something went wrong!'),
      complete: () => this.isLoading.set(false),
    });
  }
}
