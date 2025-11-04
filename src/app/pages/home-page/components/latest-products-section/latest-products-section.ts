import { Component } from '@angular/core';

import { HomeSection } from '../home-section/home-section';
// import { ProductCard } from '../../../products-page/components/product-card/product-card';

@Component({
  selector: 'app-latest-products-section',
  imports: [HomeSection],
  templateUrl: './latest-products-section.html',
  styleUrl: './latest-products-section.scss',
})
export class LatestProductsSection {}
