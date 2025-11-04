import { Component } from '@angular/core';

import { HomeSection } from '../home-section/home-section';

@Component({
  selector: 'app-hero-section',
  imports: [HomeSection],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {}
