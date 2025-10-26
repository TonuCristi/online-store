import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.primary]': "variant() === 'primary'",
    '[class.secondary]': "variant() === 'secondary'",
    '[class.full]': "size() === 'full'",
    '(click)': 'handleClick($event)',
  },
})
export class Button {
  readonly variant = input<'primary' | 'secondary'>();
  readonly size = input<'full'>();

  onClick = output();

  handleClick(e: Event) {
    e.preventDefault();
    this.onClick.emit();
  }
}
