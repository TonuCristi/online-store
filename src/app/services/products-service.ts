import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { AddProduct, Product, SortType } from '../models/product.model';
import { PER_PAGE } from '../pages/products-page/products.constants';
import { API_CONFIG } from '../config/api.config';

interface ProductsParams {
  categoryId: string;
  currentPage: number;
  perPage: number;
  sortType: SortType;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = `${API_CONFIG.baseUrl}/products`;
  private http = inject(HttpClient);

  // products = signal<Product[]>([]);
  // isLoading = signal<boolean>(false);
  // error = signal<string>('');

  getProductsTotalPages(categoryId: string): Observable<number> {
    return this.http
      .get<Product[]>(this.url, {
        params: {
          categoryId,
        },
      })
      .pipe(
        delay(1000),
        map((result) => Math.ceil(result.length / PER_PAGE))
      );
  }

  getProducts(params: ProductsParams): Observable<Product[]> {
    const start = params.currentPage * PER_PAGE;
    const limit = (params.currentPage + 1) * PER_PAGE;

    const sort = {
      name: 'name',
      'price-ascending': 'price',
      'price-descending': '-price',
    }[params.sortType];

    return this.http
      .get<Product[]>(this.url, {
        params: { categoryId: params.categoryId, _start: start, _limit: limit, _sort: sort },
      })
      .pipe(delay(1000));
  }

  getLatestProducts() {
    return this.http
      .get<Product[]>(this.url, {
        params: { _limit: 4 },
      })
      .pipe(delay(1000));
  }

  searchProducts(searchValue: string): Observable<Product[]> {
    if (!searchValue) return of([]);

    return this.http.get<Product[]>(this.url).pipe(
      delay(1000),
      map((result) => {
        return result.filter((product) =>
          `${product.name}${product.description}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }

  addProduct(newProduct: AddProduct) {
    console.log('Product added!');
  }
}
