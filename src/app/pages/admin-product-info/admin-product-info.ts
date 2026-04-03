import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductInfoModel } from '../../models/product-info.model';

import { ProductSizes } from '../../models/product-info.model';

@Component({
  selector: 'app-admin-product-info',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    FileUploadModule,
    ButtonModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    ToggleButtonModule,
    ToastModule],
  templateUrl: './admin-product-info.html',
  styleUrl: './admin-product-info.css',
})


export class AdminProductInfo {

  product: ProductInfoModel = {
    title: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    main_image: '',
    available: '',
    images: [],
    sizes: []
  };

  allSizes = [
    27, 28, 29, 30, 31, 32, 32.5,
    33, 34, 34.5, 35, 36, 37, 38,45,46,56,57,57,5,767
  ];

  sizes = [34, 36]



  toggleSize(size: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.sizes.push(size);
    } else {
      this.removeSize(size);
    }
    
    console.log('Выбранные размеры:', this.sizes);
  }
       
    remove_from_array(list: any[], value: any): void{
    const index = list.indexOf(value);
    if (index > -1){
      list.splice(index, 1);
    }
  }

  removeSize(size: number): void{
    this.remove_from_array(this.sizes, size);
  }

  categories = ['Кроссовки' , 'Одежда' ,'Аксессуары' ];

  isActive: boolean = this.product.available == "В наличии" ? true : false;
  uploadedFiles: any[] = [];


  onUpload(event: any) {
    this.uploadedFiles = event.files;

  }

  saveProduct() {
    // Здесь логика сохранения товара
    console.log('Сохраняем товар:', this.product);
    
  }



  print(){
    console.log(this.product)
  }

  // cancel() {
  //   // Очистка формы или навигация назад
  //   this.product = {
  //     name: '',
  //     brand: '',
  //     category: null,
  //     description: '',
  //     price: null,
  //     description: '',
  //     sizes: [],
  //     isActive: true
  //   };
  //   this.uploadedFiles = [];
  // }
}
