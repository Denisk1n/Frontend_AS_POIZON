import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltersList, Price } from '../models/filters-lists.model';
import { Productcard } from '../models/product-card.model';

@Injectable({
  providedIn: 'root',
})

export class FiltersLogic {
  
  private AllFilters: FiltersList = {
    sizes: [],      // Пустой набор размеров
    brands: [],      // Пустой набор брендов
    available: [],     // Пустой набор статусов
    price: {
      min: 0,
      max: 100000
    },    // Пустой набор цен
    sorted: 'default'                   // Сортировка по умолчанию
  };

  private APIURL = 'http://127.0.0.1:8000'
  constructor(private http: HttpClient){}


  post_ProductCatdsApplyingFilters(filters: FiltersList): Observable<Productcard[]>{
    return this.http.post<Productcard[]>(`${this.APIURL}/sneakers_with_filters`, filters);
  }



  remove_from_array(list: any[], value: any): void{
    const index = list.indexOf(value);
    if (index > -1){
      list.splice(index, 1);
    }
  }

  addSize(size: number): void{
    this.AllFilters.sizes.push(size);
  }

  removeSize(size: number): void{
    this.remove_from_array(this.AllFilters.sizes, size);
  }

  getSizes(): number[] {
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
    this.AllFilters.price.min = minprice;
    this.AllFilters.price.max = maxprice;
  }

  getPrice(): Price{
    return this.AllFilters.price;
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
