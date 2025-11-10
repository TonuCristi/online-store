import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductsFilters } from './components/products-filters/products-filters';
import { ProductsSort } from './components/products-sort/products-sort';
import { ProductsList } from './components/products-list/products-list';
import { Pagination } from '../../common/pagination/pagination';
import { Spinner } from '../../common/spinner/spinner';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { Product, SortType } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { PER_PAGE } from './products.constants';
import { Option, Select } from '../../common/select/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  imports: [FormsModule, ProductsFilters, Spinner, ProductsList, Pagination, Select],
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
  isProductsLoading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  sortType = signal<SortType>('name');

  readonly productsParams = computed(() => ({
    categoryId: this.categoryId,
    currentPage: this.currentPage(),
    perPage: PER_PAGE,
    sortType: this.sortType(),
  }));

  readonly options: Option[] = [
    { value: 'name', text: 'Name' },
    { value: 'price-ascending', text: 'Price ascending' },
    { value: 'price-descending', text: 'Price descending' },
  ];

  get categoryId() {
    return this.activatedRoute.snapshot.params['categoryId'];
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadProducts() {
    this.isProductsLoading.set(true);

    this.productsService.getProducts(this.productsParams()).subscribe({
      next: (productsResult) => this.updateProducts(productsResult),
      error: () => this.error.set('Something went wrong!'),
      complete: () => this.isProductsLoading.set(false),
    });
  }

  loadPrevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((prev) => prev - 1);
      // this.loadProducts();
    }
  }

  loadNextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update((prev) => prev + 1);
      // this.loadProducts();
    }
  }

  loadPage(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }

  sortData(newSortType: string) {
    this.sortType.set(newSortType as SortType);
    this.currentPage.set(0);
    this.loadProducts();
  }

  loadInitialData() {
    forkJoin({
      productsResult: this.productsService.getProducts(this.productsParams()),
      productsTotalPagesResult: this.productsService.getProductsTotalPages(this.categoryId),
      categoryResult: this.categoriesService.getCategory(this.categoryId),
    }).subscribe({
      next: ({ productsResult, productsTotalPagesResult, categoryResult }) => {
        this.updateProducts(productsResult);
        this.totalPages.set(productsTotalPagesResult);
        this.category.set(categoryResult);
      },
      error: () => this.error.set('Something went wrong!'),
      complete: () => this.isLoading.set(false),
    });
  }

  updateProducts(newProducts: Product[]) {
    this.products.set(newProducts);
  }
}
