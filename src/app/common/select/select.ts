import { Component, input, output } from '@angular/core';

@Component({
  selector: 'select[appSelect]',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  host: {
    '(change)': 'onSelect($event)',
    '[class.full]': 'size() === "full"',
    '[class.auto]': 'size() === "auto"',
  },
})
export class Select {
  size = input.required<'full' | 'auto'>();
  options = input.required<Option[]>();
  onChange = output<string>();

  onSelect(e: Event) {
    const target = e.target as HTMLSelectElement;

    if (target) {
      this.onChange.emit(target.value);
    }
  }
}

export interface Option {
  value: string;
  text: string;
}
