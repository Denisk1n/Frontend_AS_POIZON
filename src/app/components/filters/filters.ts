import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersLogic } from '../../services/filters-logic';

@Component({
  selector: 'app-filters',
  imports: [CommonModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})

export class Filters {

  @Output() filtersApplied = new EventEmitter<void>();

  constructor(public allFilters: FiltersLogic) {}
  


  // ВСЕ ДЛЯ РАЗМЕРА ОБУВИ
  private _allSizes = [
    27, 28, 29, 30, 31, 32, 32.5,
    33, 34, 34.5, 35, 36, 37, 38
  ];

  public get allSizes() {
    return this._allSizes;
  }
  public set allSizes(value) {
    this._allSizes = value;
  }


  // Состояния
  isAccordionOpenSizes = false;
  showAllSizes = false;
  selectedSizes: number[] = [];

  updateDisplayValuesSizes(): void {
    this.selectedSizes = this.allFilters.getSizes();
  }

  updateDisplayValuesBrands(): void {
    this.selectedBrands = this.allFilters.getBrands();
  }
  
  updateDisplayValuesStatuse(): void {
    this.selectedStatuses = this.allFilters.getStatuses();
  }

  

  // Получаем видимые размеры в зависимости от состояния
  get visibleSizes(): number[] {
    if (this.showAllSizes) {
      return this.allSizes;
    }
    return this.allSizes.slice(0, 6); // Показываем только первые 6
  }
  
  // Показывать ли кнопку "Показать больше"
  shouldShowMoreButtonSizes(): boolean {
    return this.isAccordionOpenSizes && this.allSizes.length > 6;
  }
  
  // Открыть/закрыть аккордеон
  toggleAccordionSizes() {
    this.isAccordionOpenSizes = !this.isAccordionOpenSizes;
  }
  
  // Показать/скрыть все размеры
  toggleAllSizes() {
    this.showAllSizes = !this.showAllSizes;
  }
  
  // Выбрать/отменить размер
  toggleSize(size: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.allFilters.addSize(size);
    } else {
      this.allFilters.removeSize(size);
    }
    
    console.log('Выбранные размеры:', this.allFilters.getSizes());
  }
  

    // ВСЕ ДЛЯ БРЕНДЫ
  allBrands = [
  'Nike',
  'Adidas',
  'Puma',
  'Reebok',
  'New Balance',
  'Asics',
  'Under Armour',
  'Converse',
  'Vans',
  'Skechers',
  'Jordan',
  'Fila'
  ];

  // Выбранные размеры
  selectedBrands: string[] = [];
  
  // Состояния
  isAccordionOpenBrands = false;
  showAllBrands = false;


  // Получаем видимые бренды в зависимости от состояния
  get visibleBrands(): string[] {
    if (this.showAllBrands) {
      return this.allBrands;
    }
    return this.allBrands.slice(0, 6); // Показываем только первые 6
  }


  // Показывать ли кнопку "Показать больше"
  shouldShowMoreButtonBrands(): boolean {
    return this.isAccordionOpenBrands && this.allSizes.length > 6;
  }
  
  // Открыть/закрыть аккордеон
  toggleAccordionBrands() {
    this.isAccordionOpenBrands = !this.isAccordionOpenBrands;
  }
  
  // Показать/скрыть все размеры
  toggleAllBrands() {
    this.showAllBrands = !this.showAllBrands;
  }
  
  // Выбрать/отменить размер
  toggleBrand(brand: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.allFilters.addBrand(brand);
    } else {
      this.allFilters.removeBrand(brand);
    }
    
    console.log('Выбранные бренды:', this.allFilters.getBrands());
  }


  // ВСЕ ДЛЯ СТАТУСА В НАЛИЧИИ
  allStatuses = [
  'В наличии',
  'Под заказ'
  ];

  // Выбранные statuses
  selectedStatuses: string[] = [];
  
  // Состояния
  isAccordionOpenStatuses = false;
  showAllStatuses = false;


  // Получаем видимые бренды в зависимости от состояния
  get visibleStatuses(): string[] {
    if (this.showAllStatuses) {
      return this.allStatuses;
    }
    return this.allStatuses.slice(0, 6); // Показываем только первые 6
  }
  
  // Открыть/закрыть аккордеон
  toggleAccordionStatuses() {
    this.isAccordionOpenStatuses = !this.isAccordionOpenStatuses;
  }

  // Выбрать/отменить размер
  toggleStatuse(statuse: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.allFilters.addStatuse(statuse);
    } else {
      this.allFilters.removeStatuse(statuse);
    }
    
    console.log('Выбранные статусы:', this.allFilters.getStatuses());
  }
  

  minPrice: number = 0;
  maxPrice: number = 100000;
  
  @Output() priceChanged = new EventEmitter<{min: number, max: number}>();
  

  isAccordionOpenPrice = false;

  // Открыть/закрыть аккордеон
  toggleAccordionPrice() {
    this.isAccordionOpenPrice = !this.isAccordionOpenPrice;
  }


  // Проценты для ползунка
  get minPercent(): number {
    return ((this.allFilters.getPrice().min - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
  }
  
  get maxPercent(): number {
    return ((this.allFilters.getPrice().max- this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
  }
  
  // Обновление через ползунок (мин)
  updateMinSlider(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    
    if (value < this.allFilters.getPrice().max) {
      this.allFilters.getPrice().min = value;
      this.emitPriceChange();
    }
  }
  
  // Обновление через ползунок (макс)
  updateMaxSlider(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    
    if (value > this.allFilters.getPrice().min) {
      this.allFilters.getPrice().max = value;
      this.emitPriceChange();
    }
  }
  
  // Обновление через input (мин)
  updateMinPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value) || this.minPrice;
    
    if (value < this.allFilters.getPrice().max) {
      this.allFilters.getPrice().min = Math.max(this.minPrice, value);
      this.emitPriceChange();
    } else {
      // Если ввели значение больше максимального, сбрасываем
      input.value = this.allFilters.getPrice().min.toString();
    }
  }
  
  // Обновление через input (макс)
  updateMaxPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value) || this.maxPrice;
    
    if (value > this.allFilters.getPrice().min) {
      this.allFilters.getPrice().max = Math.min(this.maxPrice, value);
      this.emitPriceChange();
    } else {
      // Если ввели значение меньше минимального, сбрасываем
      input.value = this.allFilters.getPrice().max.toString();
    }
  }
  
  // Отправка события
  private emitPriceChange() {
    this.priceChanged.emit({
      min: this.allFilters.getPrice().min,
      max: this.allFilters.getPrice().max
    });
  }

  getAllFilters(){
    //http запрос
    console.log('Все выбранные фильтры', this.allFilters.getFilters())
    this.filtersApplied.emit();
  }

}
