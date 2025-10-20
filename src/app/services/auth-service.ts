import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { LoginUserForm, RegisterUserForm, User, UserResponse } from '../models/user.model';

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

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private mapUser(user: UserResponse): User {
    return { id: user.id, email: user.email };
  }

  private navigateToHome() {
    this.router.navigate(['/']);
  }

  private saveUser(user: UserResponse) {
    this.user.set(user);
    this.saveToken(user.id);
    this.navigateToHome();
  }

  clearError() {
    this.error.set('');
  }

  register(newUser: RegisterUserForm) {
    this.isLoading.set(true);
    return this.http.post<UserResponse>(this.url, newUser).pipe(
      delay(1000),
      map(this.mapUser),
      tap((result) => this.saveUser(result)),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  login(credentials: LoginUserForm) {
    this.isLoading.set(true);
    return this.http
      .get<UserResponse[]>(
        `${this.url}?email=${credentials.email}&password=${credentials.password}`
      )
      .pipe(
        delay(1000),
        map((result) => result.map(this.mapUser)),
        tap((result) => {
          const user = result[0];

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
