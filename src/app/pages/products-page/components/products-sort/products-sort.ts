import { Component, input } from '@angular/core';

import { Option, Select } from '../../../../common/select/select';
import { SortType } from '../../../../models/product.model';

@Component({
  selector: 'app-products-sort',
  imports: [Select],
  templateUrl: './products-sort.html',
  styleUrl: './products-sort.scss',
})
export class ProductsSort {
  readonly options: Option[] = [
    { value: 'name', text: 'Name' },
    { value: 'price-ascending', text: 'Price ascending' },
    { value: 'price-descending', text: 'Price descending' },
  ];
  sortType = input.required<SortType>();
}
