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
    '(click)': 'handleClick()',
  },
})
export class Button {
  readonly variant = input<'primary' | 'secondary'>();
  readonly size = input<'full'>();

  readonly onClick = output();

  handleClick() {
    this.onClick.emit();
  }
}
