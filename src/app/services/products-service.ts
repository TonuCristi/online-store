import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';

import { ProductResponse } from '../models/product.model';
import { mapProduct } from '../utils/mapProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  searchProducts(searchValue: string) {
    if (!searchValue) return of([]);

    return this.http.get<ProductResponse[]>(this.url).pipe(
      delay(1000),
      map((result) => {
        console.log(result);

        const mappedProducts = result.map((product) => mapProduct(product));

        return mappedProducts.filter((product) =>
          `${product.name}${product.description}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }
}
