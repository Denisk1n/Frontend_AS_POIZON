import { Component } from '@angular/core';
import { InfoFeatures } from '../../components/info-features/info-features';
import { ProductsList } from '../../components/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [InfoFeatures, ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

}
