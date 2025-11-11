import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, delay, finalize, Observable, of, tap } from 'rxjs';

import { Category } from '../models/category.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly url = `${API_CONFIG.baseUrl}/categories`;
  private readonly http = inject(HttpClient);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      delay(1000),
      tap((result) => this.categories.set(result)),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of([]);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  getCategory(categoryId: string): Observable<Category | null> {
    return this.http.get<Category>(`${this.url}/${categoryId}`).pipe(delay(1000));
  }
}
