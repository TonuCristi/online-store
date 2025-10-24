import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule],
  templateUrl: './products-search.html',
  styleUrl: './products-search.scss',
})
export class ProductsSearch {
  searchValue = signal<string>('');

  onSearch() {
    console.log(this.searchValue());
  }
}
