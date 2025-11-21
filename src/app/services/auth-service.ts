import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { LoginUserForm, RegisterUserForm, User } from '../models/user.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${API_CONFIG.baseUrl}/users`;

  private http = inject(HttpClient);
  private router = inject(Router);

  isLogged = signal<boolean>(!!localStorage.getItem('token'));
  user = signal<User | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  private saveUser(user: User) {
    this.isLogged.set(true);
    this.user.set(user);
    this.isLoading.set(true);
    localStorage.setItem('token', user.id);
  }

  private navigateToHome() {
    this.router.navigate(['/']);
  }

  clearError() {
    this.error.set('');
  }

  register(newUser: RegisterUserForm): Observable<User | null> {
    this.isLoading.set(true);
    return this.http.post<User>(this.url, { ...newUser, role: 'user' }).pipe(
      delay(1000),
      tap((result) => {
        this.saveUser(result);
        this.navigateToHome();
      }),
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
      .get<User[]>(`${this.url}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        delay(1000),
        map((result) => result[0]),
        tap((result) => {
          this.saveUser(result);
          this.navigateToHome();
        }),
        catchError(() => {
          this.error.set('Something went wrong!');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      );
  }

  logout() {
    this.isLogged.set(false);
    this.user.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getLoggedUser(): Observable<User | null> {
    const token = localStorage.getItem('token');

    if (!token) return of(null);

    return this.http.get<User>(`${this.url}/${token}`).pipe(
      delay(1000),
      tap((result) => this.saveUser(result)),
      catchError(() => {
        this.error.set('Something went wrong!');
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
