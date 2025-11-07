import { Component, input, output } from '@angular/core';

import { Button } from '../button/button';

@Component({
  selector: 'app-pagination',
  imports: [Button],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  isProductsLoading = input.required<boolean>();
  prev = output();
  next = output();

  prevPage() {
    this.prev.emit();
  }

  nextPage() {
    this.next.emit();
  }
}
