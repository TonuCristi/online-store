import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../common/button/button';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Button],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {}
