import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Productcard } from '../../models/product-card.model';

@Component({
  selector: 'app-admin-products-table',
  imports: [FormsModule, TableModule, CommonModule],
  templateUrl: './admin-products-table.html',
  styleUrl: './admin-products-table.css',
})
export class AdminProductsTable {

  @Input() products!: Productcard[];

}
