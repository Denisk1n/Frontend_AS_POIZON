import { Injectable } from '@angular/core';
import { FiltersList, Price } from '../models/filters-lists.model';

@Injectable({
  providedIn: 'root',
})

export class FiltersLogic {
  
  private AllFilters: FiltersList = {
    sizes_list: new Set<string>(),      // Пустой набор размеров
    brand_list: new Set<string>(),      // Пустой набор брендов
    status_list: new Set<string>(),     // Пустой набор статусов
    prices: {
      min: 0,
      max: 100000
    },    // Пустой набор цен
    sorted: 'default'                   // Сортировка по умолчанию
  };


  addSize(size: string): void{
    this.AllFilters.sizes_list.add(size);
  }

  removeSize(size: string): void{
    this.AllFilters.sizes_list.delete(size);
  }

  getSizes(): Set<string> {
    return new Set(this.AllFilters.sizes_list);
  }

  addBrand(brand: string): void{
    this.AllFilters.brand_list.add(brand);
  }

  removeBrand(brand: string): void{
    this.AllFilters.brand_list.delete(brand);
  }

  getBrands(): Set<string>{
    return new Set(this.AllFilters.brand_list);
  }

  addStatuse(statuse: string): void{
    this.AllFilters.status_list.add(statuse)
  }

  removeStatuse(statuse: string): void{
    this.AllFilters.status_list.delete(statuse)
  }

  getStatuses(): Set<string>{
    return new Set(this.AllFilters.status_list);
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


  getAllFilters(): FiltersList{
    return this.AllFilters;
  }


}
