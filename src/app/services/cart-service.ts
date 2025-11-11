import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = `${API_CONFIG.baseUrl}/cart`;
  private http = inject(HttpClient);

  cartItemsCount = signal<number>(0);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  getCartItems(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}?adderId=${userId}`).pipe(delay(1000));
  }

  getCartItemsCount(): Observable<number> {
    const token = localStorage.getItem('token');

    return this.http.get<Product[]>(`${this.url}?adderId=${token}`).pipe(
      delay(1000),
      map((result) => result.length),
      tap((result) => this.cartItemsCount.set(result)),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of(0);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  addToCart(product: Product) {
    const token = localStorage.getItem('token');

    const {
      id,
      name,
      description,
      price,
      sku,
      stockQuantity,
      imageUrl,
      isActive,
      categoryId,
      userId,
    } = product;

    console.log('Added to cart!');

    return this.http.post(this.url, { ...product, adder_id: token });
  }
}
