import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, of } from 'rxjs';

import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  searchProducts(searchValue: string) {
    return this.http.get<ProductResponse[]>(this.url).pipe(
      delay(1000),
      map((result) => {
        return result.filter((product) =>
          `${product.name}${product.description}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      }),
      catchError(() => {
        return of([]);
      })
    );
  }
}
