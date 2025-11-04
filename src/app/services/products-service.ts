import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { Product, ProductResponse } from '../models/product.model';
import { mapProduct } from '../utils/mapProduct';

interface ProductsParams {
  categoryId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  getProducts(params: ProductsParams): Observable<Product[]> {
    return this.http.get<ProductResponse[]>(`${this.url}?category_id=${params.categoryId}`).pipe(
      delay(1000),
      map((result) => {
        return result.map((product) => mapProduct(product));
      })
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
