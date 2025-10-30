import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  host: {
    '[class.big]': 'size() === "big"',
    '[class.medium]': 'size() === "medium"',
    '[class.small]': 'size() === "small"',
  },
})
export class Spinner {
  readonly size = input.required<'big' | 'medium' | 'small'>();
}
