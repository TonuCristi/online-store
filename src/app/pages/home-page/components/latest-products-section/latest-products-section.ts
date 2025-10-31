import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../common/button/button';
import { HomeSection } from '../home-section/home-section';
import { ProductCard } from '../../../products-page/components/product-card/product-card';

@Component({
  selector: 'app-latest-products-section',
  imports: [RouterLink, Button, HomeSection, ProductCard],
  templateUrl: './latest-products-section.html',
  styleUrl: './latest-products-section.scss',
})
export class LatestProductsSection {}
