import { Component } from '@angular/core';

import { CategoriesDropdown } from './components/categories-dropdown/categories-dropdown';
import { HeroSection } from './components/hero-section/hero-section';
import { LatestProductsSection } from './components/latest-products-section/latest-products-section';

@Component({
  selector: 'app-home-page',
  imports: [CategoriesDropdown, HeroSection, LatestProductsSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
