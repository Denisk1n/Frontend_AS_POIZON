import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productcard } from '../../models/product-card.model';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule, TagModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})

export class ProductCard {

  @Input() product!: Productcard;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  goToSneakerInfo(){
    this.router.navigate(['sneaker-info/', this.product.id], {
      queryParams: {},
      queryParamsHandling: ''
    });
    this.cdr.detectChanges();
  }
  
  getSeverity(status: string): 'success' |  'info' |  'danger' | undefined {
    switch (status) {
      case 'В наличии':
        return 'success';
      case 'Под заказ':
        return 'danger';
      default:
        return 'info';
    }
  }
  

}
