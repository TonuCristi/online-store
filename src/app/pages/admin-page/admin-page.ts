import { Component } from '@angular/core';
import { AddProductSection } from './components/add-product-section/add-product-section';

@Component({
  selector: 'app-admin-page',
  imports: [AddProductSection],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage {}
