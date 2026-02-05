import { Injectable } from '@angular/core';
import { FiltersList, Price } from '../models/filters-lists.model';

@Injectable({
  providedIn: 'root',
})

export class FiltersLogic {
  
  private AllFilters: FiltersList = {
    sizes: [],      // Пустой набор размеров
    brands: [],      // Пустой набор брендов
    available: [],     // Пустой набор статусов
    prices: {
      min: 0,
      max: 100000
    },    // Пустой набор цен
    sorted: 'default'                   // Сортировка по умолчанию
  };

  remove_from_array(list: string[], value: string): void{
    const index = list.indexOf(value);
    if (index > -1){
      list.splice(index, 1);
    }
  }

  addSize(size: string): void{
    this.AllFilters.sizes.push(size);
  }

  removeSize(size: string): void{
    this.remove_from_array(this.AllFilters.sizes, size);
  }

  getSizes(): string[] {
    return Array.from(this.AllFilters.sizes);
  }

  addBrand(brand: string): void{
    this.AllFilters.brands.push(brand);
  }

  removeBrand(brand: string): void{
    this.remove_from_array(this.AllFilters.brands, brand);
  }

  getBrands(): string[]{
    return Array.from(this.AllFilters.brands);
  }

  addStatuse(statuse: string): void{
    this.AllFilters.available.push(statuse)
  }

  removeStatuse(statuse: string): void{
    this.remove_from_array(this.AllFilters.available, statuse)
  }

  getStatuses(): string[]{
    return Array.from(this.AllFilters.available);
  }


  setPrice(minprice: number, maxprice: number): void{
    this.AllFilters.prices.min = minprice;
    this.AllFilters.prices.max = maxprice;
  }

  getPrice(): Price{
    return this.AllFilters.prices;
  }


  setSorted(sort: string): void{
    this.AllFilters.sorted = sort;
  }
  
  getSorted(): string{
    return this.AllFilters.sorted;
  }


  getFilters(): FiltersList{
    return this.AllFilters;
  }


}
