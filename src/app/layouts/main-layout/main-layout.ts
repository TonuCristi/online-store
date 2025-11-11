import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../common/header/header';
import { Spinner } from '../../common/spinner/spinner';
import { Footer } from '../../common/footer/footer';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Spinner, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);

  isLoading = computed(
    () =>
      this.authService.isLoading() ||
      this.categoriesService.isLoading() ||
      this.cartService.isLoading()
  );

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe();
    this.categoriesService.getCategories().subscribe();
    this.cartService.getCartItemsCount().subscribe();
  }
}
