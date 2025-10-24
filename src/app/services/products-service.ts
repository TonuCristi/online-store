import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ProductResponse } from '../models/product.model';
import { catchError, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  searchProducts(searchValue: string) {
    console.log(`${this.url}?q=${searchValue}`);

    return this.http.get<ProductResponse[]>(`${this.url}?q=${searchValue}`).pipe(
      delay(1000),
      map((result) => {
        console.log(result);

        return result;
      }),
      catchError((err) => {
        console.log(err);

        return of([]);
      })
    );
  }
}
