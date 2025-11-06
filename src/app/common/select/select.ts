import { Component, input, output } from '@angular/core';

interface Option {
  value: string;
  text: string;
}

@Component({
  selector: 'select[appSelect]',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  host: {
    '(change)': 'onChange()',
    '[class.full]': 'size() === "full"',
    '[class.auto]': 'size() === "auto"',
  },
})
export class Select {
  size = input.required<'full' | 'auto'>();
  options = input.required<Option[]>();
  onSelect = output();

  onChange() {
    this.onSelect.emit();
  }
}
