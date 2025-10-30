import { Component } from '@angular/core';
import { CategoriesDropdown } from './components/categories-dropdown/categories-dropdown';

@Component({
  selector: 'app-home-page',
  imports: [CategoriesDropdown],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
