import { Component, input, signal } from '@angular/core';

import { ClickOutside } from '../../directives/click-outside';

@Component({
  selector: 'app-accordion',
  imports: [ClickOutside],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  title = input.required<string>();
  isOpen = signal<boolean>(false);

  openAccordion() {
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  closeAccordion() {
    this.isOpen.set(false);
  }
}
