import { Component, ChangeDetectorRef } from '@angular/core';
import { InfoFeatures } from '../../components/info-features/info-features';
import { ProductsList } from '../../components/products-list/products-list';
import { Productcard } from '../../models/product-card.model';
import { ProductListLogic } from '../../services/product-list-logic';

@Component({
  selector: 'app-home',
  imports: [InfoFeatures, ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  newProductCards : Productcard[] = []
  
  loading = false;
  error = '';

  constructor(
    private prodListLog: ProductListLogic,
    private cdr: ChangeDetectorRef
    ){
        this.loadNewProductCards()
    }

  loadNewProductCards(): void {
      this.loading = true;
      this.error = '';
      
      this.prodListLog.get_NewProductCard()
        .subscribe({
          next: (data: Productcard[]) => {
            this.newProductCards = data; // Присваиваем данные из запроса
            this.loading = false;

            // Проверка данных
            console.log('Полученные данные:', this.newProductCards);
  
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
