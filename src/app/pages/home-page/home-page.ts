import { Component, inject, OnInit, signal } from '@angular/core';

import { CategoriesDropdown } from './components/categories-dropdown/categories-dropdown';
import { HeroSection } from './components/hero-section/hero-section';
import { LatestProductsSection } from './components/latest-products-section/latest-products-section';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/product.model';
import { Spinner } from '../../common/spinner/spinner';

@Component({
  selector: 'app-home-page',
  imports: [CategoriesDropdown, HeroSection, LatestProductsSection, Spinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private readonly productsService = inject(ProductsService);

  latestProducts = signal<Product[]>([]);
  isLatestProductsLoading = signal<boolean>(true);
  latestProductsError = signal<string>('');

  ngOnInit(): void {
    this.productsService.getLatestProducts().subscribe({
      next: (result) => {
        this.latestProducts.set(result);
        this.isLatestProductsLoading.set(false);
      },
      error: () => {
        this.latestProductsError.set('Something went wrong!');
        this.isLatestProductsLoading.set(false);
      },
    });
  }
}
