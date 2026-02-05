import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filters } from '../../components/filters/filters';
import { ProductsList } from '../../components/products-list/products-list';
import { DropDownMenu } from '../../components/drop-down-menu/drop-down-menu';
import { FiltersLogic } from '../../services/filters-logic';
import { Productcard } from '../../models/product-card.model';

@Component({
  selector: 'app-sneakers',
  imports: [Filters, ProductsList, DropDownMenu, CommonModule],
  templateUrl: './sneakers.html',
  styleUrl: './sneakers.css',
})

export class Sneakers {

  

  productCards: Productcard[] = [];
  loading = false;
  error = '';

  constructor(
    public allFilters: FiltersLogic,
    public cdr: ChangeDetectorRef
  ){
    console.log("фильтры", this.allFilters.getFilters());
    this.loadProductCards();
  }


  loadProductCards(){
    this.loading = true;
    this.error = '';
    this.allFilters.post_ProductCatdsApplyingFilters(this.allFilters.getFilters())
    .subscribe({
      next: (data: Productcard[]) => {
          
          this.productCards = data; // Присваиваем данные из запроса
          this.loading = false;
          this.cdr.detectChanges(); // важная тема для обновления данных
      },
      error: (err) => {
        this.error = `Ошибка ${err.status}: ${err.message}`;
        this.error = 'Ошибка загрузки данных';
        this.loading = false;
        console.error('Ошибка:', err);
        this.cdr.detectChanges();
      }
    }); 
  }


}
