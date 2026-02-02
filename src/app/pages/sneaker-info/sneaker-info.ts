import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoModel } from '../../models/product-info.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInfo } from '../../services/product-info';

@Component({
  selector: 'app-sneaker-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './sneaker-info.html',
  styleUrl: './sneaker-info.css',
})

export class SneakerInfo {
  
  product: ProductInfoModel = {
    title: '',
    brand: '',
    category: '',
    price: 0,
    main_image: '',
    available: '',
    images: [],
    sizes: []
  };

  productId!: number;
  loading = false;
  error = '';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductInfo,
    private cdr: ChangeDetectorRef
    ){
      this.route.params.subscribe(params => {
        this.productId = +params['id']; 
        this.loadProduct()
      })
    }


  loadProduct(): void {
    this.loading = true;
    this.error = '';
    
    this.productService.get_product_info(this.productId)
      .subscribe({
        next: (data: ProductInfoModel) => {
          this.product = data; // Присваиваем данные из запроса
          this.loading = false;
          // Проверка данных
          console.log('Полученные данные:', this.product);

          this.cdr.detectChanges(); // важная тема для обновления данных
        },
        error: (err) => {
          this.error = 'Ошибка загрузки данных';
          this.loading = false;
          console.error('Ошибка:', err);
          this.cdr.detectChanges();
        }
      });
  }
}
