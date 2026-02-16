import { Component, ChangeDetectorRef } from '@angular/core';
import { AdminProductsTable } from '../../components/admin-products-table/admin-products-table';
import { Productcard } from '../../models/product-card.model';
import { AdminPanelLogic } from '../../services/admin-panel-logic';

@Component({
  selector: 'app-admin-panel',
  imports: [AdminProductsTable],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})

export class AdminPanel {

  products!: Productcard[];

  loading = false;
  error = '';

  constructor(
    private admPanelLogic: AdminPanelLogic,
    private cdr: ChangeDetectorRef 
  ){
    this.loadProducts();
  }

  loadProducts(): void {
      this.loading = true;
      this.error = '';
      
      this.admPanelLogic.get_ProductCards()
        .subscribe({
          next: (data: Productcard[]) => {
            this.products = data; // Присваиваем данные из запроса
            this.loading = false;
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
