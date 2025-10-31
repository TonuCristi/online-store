import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, delay, finalize, Observable, of, tap } from 'rxjs';

import { Category, CategoryResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly url = 'http://localhost:3000/categories';
  private readonly http = inject(HttpClient);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse[]>(this.url).pipe(
      delay(1000),
      tap((result) => {
        this.categories.set(result);
      }),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of([]);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    );
  }
}
