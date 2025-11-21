import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsFilters } from './components/products-filters/products-filters';
import { ProductsList } from './components/products-list/products-list';
import { Pagination } from '../../common/pagination/pagination';
import { Spinner } from '../../common/spinner/spinner';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { Product, SortType } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { PER_PAGE } from './products.constants';
import { Option, Select } from '../../common/select/select';
import { CategoriesDropdown } from '../home-page/components/categories-dropdown/categories-dropdown';

@Component({
  selector: 'app-products-page',
  imports: [
    FormsModule,
    ProductsFilters,
    Spinner,
    ProductsList,
    Pagination,
    Select,
    CategoriesDropdown,
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  products = signal<Product[]>([]);
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  category = signal<Category | null>(null);
  isProductsLoading = signal<boolean>(false);
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  sortType = signal<SortType>('name');
  categoryId = signal<string>(this.activatedRoute.snapshot.params['categoryId']);

  private readonly productsParams = computed(() => ({
    categoryId: this.categoryId(),
    currentPage: this.currentPage(),
    perPage: PER_PAGE,
    sortType: this.sortType(),
  }));

  readonly options: Option[] = [
    { value: 'name', text: 'Name' },
    { value: 'price-ascending', text: 'Price ascending' },
    { value: 'price-descending', text: 'Price descending' },
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId.set(params['categoryId']);
      this.sortType.set('name');
      this.loadInitialData();
    });
  }

  loadProducts() {
    this.isProductsLoading.set(true);

    this.productsService.getProducts(this.productsParams()).subscribe({
      next: (productsResult) => {
        this.updateProducts(productsResult);
        this.isProductsLoading.set(false);
      },
      error: () => {
        this.error.set('Something went wrong!');
        this.isProductsLoading.set(false);
      },
    });
  }

  loadPrevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((prev) => prev - 1);
      this.loadProducts();
    }
  }

  loadNextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update((prev) => prev + 1);
      this.loadProducts();
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
    this.isLoading.set(true);

    forkJoin({
      productsResult: this.productsService.getProducts(this.productsParams()),
      productsTotalPagesResult: this.productsService.getProductsTotalPages(this.categoryId()),
      categoryResult: this.categoriesService.getCategory(this.categoryId()),
    }).subscribe({
      next: ({ productsResult, productsTotalPagesResult, categoryResult }) => {
        this.updateProducts(productsResult);
        this.totalPages.set(productsTotalPagesResult);
        this.category.set(categoryResult);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Something went wrong!');
        this.isLoading.set(false);
      },
    });
  }

  updateProducts(newProducts: Product[]) {
    this.products.set(newProducts);
  }
}
