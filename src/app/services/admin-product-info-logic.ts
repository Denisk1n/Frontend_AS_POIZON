import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticData } from '../models/static-data.model';

@Injectable({
  providedIn: 'root',
})
export class AdminProductInfoLogic {
  
  private APIURL = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient){}

  get_static_data():Observable<StaticData>{
    return this.http.get<StaticData>(`${this.APIURL}/static-data`)
  }

}
