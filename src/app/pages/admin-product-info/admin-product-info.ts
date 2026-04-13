import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

import { ProductInfo } from '../../services/product-info';
import { AdminProductInfoLogic } from '../../services/admin-product-info-logic';
import { ProductSizes } from '../../models/product-info.model';
import { StaticData } from '../../models/static-data.model';
import { StaticDataService} from '../../services/static-data';


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

  loading = false;
  error = '';
  
  // Главное фото
  newMainImageFile: File | null = null;
  newMainImagePreview: string | null = null;
  mainImageChanged: boolean = false;
  mainImageDeleted: boolean = false;
  
  // Галерея
  newGalleryFiles: File[] = [];
  newGalleryPreviews: string[] = [];


  onMainImageSelect(event: any) {
    this.newMainImageFile = event.files[0];
    this.mainImageChanged = true;
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newMainImagePreview = e.target.result;
      this.cdr.detectChanges();
      //console.log("Ссылка на фото", this.newMainImagePreview);      
    };
    
    if (this.newMainImageFile){
      reader.readAsDataURL(this.newMainImageFile);
    }
  }

  removeCurrentMainImage() {
    this.product.main_image = '';
    this.mainImageDeleted = true;
    this.mainImageChanged = true;
  }

  cancelNewMainImage() {
    this.newMainImageFile = null;
    this.newMainImagePreview = null;
    this.mainImageChanged = false;
  }

  onGalleryImagesSelect(event: any) {
    const files = [...event.files];

    console.log("Выбрано файлов:", files.length);
    console.log("Файлы:", files);

    this.newGalleryFiles.push(...files);

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newGalleryPreviews.push(e.target.result);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  markImageForDeletion(index: number) {
    this.product.images[index].delete = true;
  }
  
  removeNewGalleryImage(index: number) {
    this.newGalleryFiles.splice(index, 1);
    this.newGalleryPreviews.splice(index, 1);

    console.log(this.newGalleryFiles);
  }

  
  loadProduct(): void {
    this.loading = true;
    this.error = '';
    
    this.productService.get_product_info(1)
      .subscribe({
        next: (data: ProductInfoModel) => {
          this.product = data; // Присваиваем данные из запроса
          this.loading = false;
          // Проверка данных
          console.log('Полученные данные:', this.product);
          this.setIsActive();
          this.cdr.detectChanges(); // важная тема для обновления данных
        },
        error: (err) => {
          this.error = 'Ошибка загрузки данных';
          this.loading = false;
          console.error('Ошибка:', err);
          this.cdr.detectChanges();
        }
      });

      this.loading = false;
      this.error = '';
  }


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

  staticData: StaticData = {
    sneakerSizes: [],
    brands: []
  }


  constructor(
    private route: ActivatedRoute, 
    private staticDataSetvice: AdminProductInfoLogic, 
    private cdr: ChangeDetectorRef,
    private productService: ProductInfo,
    private staticDataService: StaticDataService
  ){
  }
  


  async ngOnInit() {
    // Получаем данные из кэша (без повторной загрузки)
    await this.staticDataService.loadStaticData();
    this.staticData = this.staticDataService.getStaticData();
    this.loadProduct();
    this.setIsActive();
  }


  toggleSize(size: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.product.sizes.push(size);
    } else {
      this.removeSneakerSize(size);
    }
    
    //console.log('Выбранные размеры:', this.product.sizes);
  }
    
  
  removeSneakerSize(sneakerSize: any): void {
    const index = this.product.sizes.findIndex(
        size => size.ru === sneakerSize.ru && 
                size.us === sneakerSize.us && 
                size.sm === sneakerSize.sm
    );
    if (index > -1) {
        this.product.sizes.splice(index, 1);
    }
  }

  isSizeSelected(sneakerSize: any): boolean {
    return this.product.sizes.some(
        size => size.ru === sneakerSize.ru && 
                size.us === sneakerSize.us && 
                size.sm === sneakerSize.sm
    );
  }


  categories = ['Кроссовки' , 'Одежда' ,'Аксессуары'];

  isActive: boolean = this.product.available == "В наличии" ? true : false;
  uploadedFiles: any[] = [];


  setAvailable(): void {
    this.product.available = this.isActive == true ? "В наличии" : "Под заказ";
    console.log("Статус: ", this.product.available);
  }

  setIsActive(): void {
    //console.log(this.product.available);
    this.isActive = this.product.available == "В наличии" ? true : false;
    
    //console.log( this.isActive);
  }

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
