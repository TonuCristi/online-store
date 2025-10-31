import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../common/header/header';
import { CategoriesService } from '../../services/categories-service';
import { Spinner } from '../../common/spinner/spinner';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Spinner],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  get isCategoriesLoading() {
    return this.categoriesService.isLoading();
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe();
  }
}
