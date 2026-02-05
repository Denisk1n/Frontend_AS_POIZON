import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productcard } from '../models/product-card.model';



@Injectable({
  providedIn: 'root',
})

export class ProductListLogic {
  
  private APIURL = 'http://127.0.0.1:8000'
  
  constructor(private http: HttpClient){}
  
  get_NewProductCard(): Observable<Productcard[]>{
    return this.http.get<Productcard[]>(`${this.APIURL}/newsneakers`)   
  }

}
