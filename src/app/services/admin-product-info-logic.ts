import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from '../models/static-data.model';
import { ProductInfoModel } from '../models/product-info.model';
import { ProductCreateModel } from '../models/product-info.model';

@Injectable({
  providedIn: 'root',
})
export class AdminProductInfoLogic {
  
  private APIURL = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient){}

  get_product_info(sneaker_id: number): Observable<ProductInfoModel>{
      // console.log('ссылка', `${this.APIURL}sneakers/${sneaker_id}`)
    return this.http.get<ProductInfoModel>(`${this.APIURL}/sneakers/${sneaker_id}`)   
  }

  // post_create_product(new_product: ProductInfoModel): Observable<ProductCreateModel>{
  //   return this.http.post<ProductCreateModel>(`${this.APIURL}/`)
  // }

}
