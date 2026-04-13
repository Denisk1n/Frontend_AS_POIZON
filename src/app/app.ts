import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StaticDataService } from './services/static-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  dataLoaded = false;
  
  constructor(private staticDataService: StaticDataService) {}

  async ngOnInit() {
    try {
      await this.staticDataService.loadStaticData();
      this.dataLoaded = true;
      //console.log('Приложение инициализировано');
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      this.dataLoaded = true; 
    }
  }

}
