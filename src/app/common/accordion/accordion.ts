import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  title = input.required<string>();
  isExpanded = signal<boolean>(false);

  toogleAccordion() {
    this.isExpanded.update((prev) => !prev);
  }
}
