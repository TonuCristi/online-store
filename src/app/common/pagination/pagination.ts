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
  isLoading = input.required<boolean>();
  prev = output();
  next = output();

  prevPage() {
    this.prev.emit();
  }

  nextPage() {
    this.next.emit();
  }
}
