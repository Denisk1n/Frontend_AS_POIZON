import { Component } from '@angular/core';
import { AdminProductsTable } from '../../components/admin-products-table/admin-products-table';

@Component({
  selector: 'app-admin-panel',
  imports: [AdminProductsTable],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})

export class AdminPanel {
  

}
