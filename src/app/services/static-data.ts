import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StaticData } from '../models/static-data.model';
import { AllBrands } from '../models/static-data.model';
import { AllSneakerSizes } from '../models/static-data.model';

@Injectable({
  providedIn: 'root',
})

export class StaticDataService {
  private staticData: StaticData = {
    sneakerSizes: [],
    brands: []
  }
  private loadingPromise: Promise<StaticData> | null = null;
  private APIURL = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) { }


  // Загружает данные один раз
  async loadStaticData(): Promise<StaticData> {

    if (this.staticData.brands.length > 0 || this.staticData.sneakerSizes.length > 0) {
      console.log('данные уже есть в кэше');
      return this.staticData;
    }

    // Если данные уже загружаются, ждем
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    // Загружаем данные с сервера
    //console.log('Загружаем данные с сервера');
    this.loadingPromise = firstValueFrom(
      this.http.get<StaticData>(`${this.APIURL}/static-data`)
    ).then(data => {
      this.staticData = data;
      this.loadingPromise = null;
      console.log('Статические данные успешно загружены');
      return this.staticData;
    }).catch(error => {
      this.loadingPromise = null;
      console.error('Ошибка загрузки статических данных:', error);
      throw error;
    });

    return this.loadingPromise;
  }

  getStaticData(): StaticData {
    return this.staticData;
  }

  // Получить бренды
  getBrands(): AllBrands[] | null {
    return this.staticData?.brands || null;
  }

  // Получить размеры кроссовок
  getSneakerSizes(): AllSneakerSizes[] | null {
    return this.staticData?.sneakerSizes || null;
  }

  // Очистить кэш (если нужно перезагрузить)
  clearCache(): void {
    this.staticData = {
    sneakerSizes: [],
    brands: []
  };
    this.loadingPromise = null;
  }

}
