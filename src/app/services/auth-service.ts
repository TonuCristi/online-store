import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { LoginUserForm, RegisterUserForm, User, UserResponse } from '../models/user.model';
import { mapUser } from '../utils/mapUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/users';

  private http = inject(HttpClient);
  private router = inject(Router);

  user = signal<User | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  private saveUser(user: UserResponse) {
    this.user.set(user);
    localStorage.setItem('token', user.id);
    this.router.navigate(['/']);
  }

  clearError() {
    this.error.set('');
  }

  register(newUser: RegisterUserForm): Observable<User | null> {
    this.isLoading.set(true);
    return this.http.post<UserResponse>(this.url, { ...newUser, role: 'user' }).pipe(
      delay(1000),
      map(mapUser),
      tap((result) => this.saveUser(result)),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  login(credentials: LoginUserForm): Observable<User | null> {
    this.isLoading.set(true);
    return this.http
      .get<UserResponse[]>(
        `${this.url}?email=${credentials.email}&password=${credentials.password}`
      )
      .pipe(
        delay(1000),
        map((result) => result.map(mapUser)[0]),
        tap((result) => {
          const user = result;

          this.saveUser(user);
        }),
        catchError(() => {
          this.error.set('Something went wrong!');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      );
  }
}
