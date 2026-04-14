import { Component, signal, inject, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderListModule} from 'primeng/orderlist'
import { ProductImages } from '../../models/product-info.model';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-admin-images-widget',
  imports: [OrderListModule, CommonModule, ButtonModule],
  standalone: true,
  template: `
      <div class="card sm:flex sm:justify-center  max-w-30rem">
            <p-orderlist [value]="imagesData" 
                          dataKey="position" 
                          [dragdrop]="true" 
                          [responsive]="true" 
                          breakpoint="575px" 
                          scrollHeight="30rem"
                          (onReorder)="onReorder($event)"
                          >

                <ng-template let-option let-selected="selected" let-index="index" #item>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-7 shrink-0 rounded"  src="{{ option.image }}" />
                        <div class=" flex flex-column">
                            <span class="text-base font-medium"> 
                              {{ option.position}} фото 
                            </span>

                            <p-button *ngIf="!option.delete" (click)="onDelete(index)" label="Удалить" severity="danger" size="small" class="pt-2"/>

                            <div *ngIf="option.delete" class=" flex flex-column" >
                              <span class="text-red-600 pb-1"> Будет удалено </span>
                              <p-button (click)="onCancel(index)" label="Отменить" severity="warn" size="small" />
                            </div>

                        </div>
                    </div>

                </ng-template>
            </p-orderlist>
        </div>
  `,
})
export class AdminImagesWidget {

  @Input() imagesData: ProductImages[] = [];
  @Output() changeImagesData = new EventEmitter<ProductImages[]>();

  constructor(private cdr: ChangeDetectorRef){}

  onReorder(event: any) {

    const newImageData = this.imagesData;
    let i: number = 1;
    
    for(let data of newImageData){
      data.position = i;
      i++;
    }
    
    console.log('с измен позициями', newImageData);
    this.changeImagesData.emit([...newImageData]); // отправляем копию
  }

  onDelete(id: number){
    this.imagesData[id].delete = true;
    const newImageData = this.imagesData;
    this.changeImagesData.emit([...newImageData]);
    this.cdr.detectChanges();
  }

  onCancel(id: number){
    this.imagesData[id].delete = false; 
    const newImageData = this.imagesData;
    this.changeImagesData.emit([...newImageData]); 
    this.cdr.detectChanges();
  }

}
