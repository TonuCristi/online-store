import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home-section',
  imports: [],
  templateUrl: './home-section.html',
  styleUrl: './home-section.scss',
})
export class HomeSection {
  title = input.required<string>();
}
