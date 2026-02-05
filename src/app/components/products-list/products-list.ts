import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Productcard } from '../../models/product-card.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, FormsModule, CommonModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})

export class ProductsList {

  @Input() width! : string;
  @Input() height! : string;

  @Input() productCards!: Productcard[];

}
