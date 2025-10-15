import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.full]': 'size() === "full"',
  },
})
export class Button {
  readonly variant = input<'primary' | 'secondary'>();
  readonly size = input<'full'>();
  readonly disabled = input<boolean>(false);
  readonly type = input<HTMLButtonElement['type']>();
  onClick = output();

  handleClick(e: Event) {
    if (this.type() !== 'submit') {
      e.preventDefault();
    }
    this.onClick.emit();
  }
}
