import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-info-features',
  imports: [],
  templateUrl: './info-features.html',
  styleUrl: './info-features.css',
})

export class InfoFeatures {
  @Input() img_link! : string;
  @Input() title! : string;
  @Input() text! : string;
}
