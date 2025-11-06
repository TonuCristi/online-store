import { Component } from '@angular/core';

import { Select } from '../../../../common/select/select';

@Component({
  selector: 'app-products-sort',
  imports: [Select],
  templateUrl: './products-sort.html',
  styleUrl: './products-sort.scss',
})
export class ProductsSort {
  readonly options = [
    { value: 'name', text: 'Name' },
    { value: 'price-ascending', text: 'Price ascending' },
    { value: 'price-descending', text: 'Price descending' },
  ];
}
