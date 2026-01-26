import { Component } from '@angular/core';
import { Filters } from '../../components/filters/filters';
import { ProductsList } from '../../components/products-list/products-list';
import { DropDownMenu } from '../../components/drop-down-menu/drop-down-menu';

@Component({
  selector: 'app-sneakers',
  imports: [Filters, ProductsList, DropDownMenu],
  templateUrl: './sneakers.html',
  styleUrl: './sneakers.css',
})
export class Sneakers {

  

}
