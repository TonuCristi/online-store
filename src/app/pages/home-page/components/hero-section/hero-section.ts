import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../common/button/button';
import { HomeSection } from '../home-section/home-section';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, Button, HomeSection],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {}
