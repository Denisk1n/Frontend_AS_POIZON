import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  
  @Input() img! : string;
  @Input() brand! : string;
  @Input() title! : string;
  @Input() price! : string;
  @Input() available! : string;
  
}
