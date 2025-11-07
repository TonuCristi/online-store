import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { Product, ProductResponse, SortType } from '../models/product.model';
import { mapProduct } from '../utils/mapProduct';
import { PER_PAGE } from '../pages/products-page/products.constants';

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
  private url = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  getProductsTotalPages(categoryId: string): Observable<number> {
    return this.http.get<ProductResponse[]>(`${this.url}?category_id=${categoryId}`).pipe(
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
      .get<ProductResponse[]>(
        `${this.url}?category_id=${params.categoryId}&_start=${start}&_limit=${limit}&_sort=${sort}`
      )
      .pipe(
        delay(1000),
        map((result) => result.map((product) => mapProduct(product)))
      );
  }

  searchProducts(searchValue: string): Observable<Product[]> {
    if (!searchValue) return of([]);

    return this.http.get<ProductResponse[]>(this.url).pipe(
      delay(1000),
      map((result) => {
        const mappedProducts = result.map((product) => mapProduct(product));

        return mappedProducts.filter((product) =>
          `${product.name}${product.description}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }
}
