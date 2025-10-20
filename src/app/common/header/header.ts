import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../button/button';
import { CartBtn } from './cart-btn/cart-btn';
import { ProductsSearch } from './products-search/products-search';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Button, CartBtn, ProductsSearch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
