import { Component } from '@angular/core';

import { Accordion } from '../accordion/accordion';

@Component({
  selector: 'app-footer',
  imports: [Accordion],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
