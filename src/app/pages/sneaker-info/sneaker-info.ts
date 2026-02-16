import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoModel } from '../../models/product-info.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInfo } from '../../services/product-info';
import { ImageSlider } from '../../components/image-slider/image-slider';
import { ProductsList } from '../../components/products-list/products-list';
import { Productcard } from '../../models/product-card.model';

@Component({
  selector: 'app-sneaker-info',
  imports: [CommonModule, FormsModule, ImageSlider, ProductsList],
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

  images: string[] = [];
  recomendedProducts: Productcard[] = [];


  create_images(): void{
    // console.log(this.product.images.length);
    this.images.push(this.product.main_image)
    if (this.product.images.length > 0){
      for (let i = 0; i < this.product.images.length; i++){
        this.images.push(this.product.images[i].image)
      }
      console.log(this.images);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductInfo,
    private cdr: ChangeDetectorRef
    ){
      this.route.params.subscribe(params => {
        this.productId = +params['id']; 
        this.loadProduct();
        this.get_recomended_sneakers();
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
          this.create_images();
          this.cdr.detectChanges(); // важная тема для обновления данных
        },
        error: (err) => {
          this.error = 'Ошибка загрузки данных';
          this.loading = false;
          console.error('Ошибка:', err);
          this.cdr.detectChanges();
        }
      });

      this.loading = false;
      this.error = '';
  }

  get_recomended_sneakers(): void{
    this.loading = true;
    this.error = "";

    this.productService.get_recomended_products()
      .subscribe({
        next: (data: Productcard[]) => {
          this.recomendedProducts = data;
          this.loading = false;

          console.log("Данные с сервера: ", this.recomendedProducts);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Ошибка загрузки данных';
          this.loading = false;
          console.error("Ошибка: ", err);
          this.cdr.detectChanges();
        }

      })
  }



}
