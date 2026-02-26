import { Component, ChangeDetectorRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productcard } from '../../models/product-card.model';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { AdminPanelLogic } from '../../services/admin-panel-logic';


@Component({
  selector: 'app-admin-products-table',
  imports: [    
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    TagModule],
  templateUrl: './admin-products-table.html',
  styleUrl: './admin-products-table.css',
})
export class AdminProductsTable {
  @ViewChild('dt') dt!: Table;

  products!: Productcard[];

  loading = false;
  error = '';
  totalRecords: number = 3

  brands: { label: string; value: string }[] = [];

  categories: any[] = [
    {label: "Кроссовки", value: "Кроссовки"},
    {label: "Одежда", value: "Одежда"},
    {label: "Аксессуары", value: "Аксессуары"}
  ];
  statuses: any[] = [
    { label: 'В наличии', value: 'В наличии' },
    { label: 'Под заказ', value: 'Под заказ' },
  ];


  selectedCategory: any = null;
  selectedStatus: any = null;
  
  // Для фильтра по цене
  priceMin: number | null = null;
  priceMax: number | null = null;



  onPriceFilter(min: string, max: string, filterCallback: Function) {
    const minVal = min ? parseFloat(min) : null;
    const maxVal = max ? parseFloat(max) : null;
    if (minVal !== null || maxVal !== null) {
      filterCallback([minVal || 0, maxVal || Number.MAX_SAFE_INTEGER]);
    } else {
      filterCallback(null);
    }
  }

    filterByCategory(table: Table, value: any) {
    console.log('Filtering by category:', value);
    
    if (value && value.value) {
      // Получаем строковое значение из объекта
      const categoryValue = value.value;
      console.log('Category value:', categoryValue);
      
      // Применяем фильтр
      table.filter(categoryValue, 'category', 'equals');
    } else {
      // Очищаем фильтр
      table.filter(null, 'category', 'equals');
    }
  }

  // ИСПРАВЛЕНО: Фильтр по статусу
  filterByStatus(table: Table, value: any) {
    console.log('Filtering by status:', value);
    
    if (value && value.value) {
      // Получаем строковое значение из объекта
      const statusValue = value.value;
      console.log('Status value:', statusValue);
      
      // Применяем фильтр
      table.filter(statusValue, 'available', 'equals');
    } else {
      // Очищаем фильтр
      table.filter(null, 'available', 'equals');
    }
  }

  // Очистка всех фильтров
  clearFilters(table: Table) {
    table.clear();
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.priceMin = null;
    this.priceMax = null;
  }


  // Определение цвета статуса
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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private admPanelLogic: AdminPanelLogic,
  ){
    this.loadProducts();
    this.loadUsedBrands();
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

  loadUsedBrands(): void{
    this.admPanelLogic.get_UsedBrands()
      .subscribe({
        next: (data: {"label": string, "value": string}[]) => {
          this.brands = data;
          this.cdr.detectChanges();
        }
      })
  }

    goToSneakerInfo(id: number){
      this.router.navigate(['sneaker-info/', id], {
        queryParams: {},
        queryParamsHandling: ''
      });
      this.cdr.detectChanges();
    }

}
