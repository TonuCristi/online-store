import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  host: {
    '(document:click)': 'handleClickOutside($event)',
  },
})
export class ClickOutside {
  private containerRef = inject(ElementRef);

  readonly clickOutside = output();

  handleClickOutside(e: Event) {
    const target = e.target as Node;
    if (!this.containerRef.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
