import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule, GalleriaModule],
  templateUrl: './image-slider.html', 
  styleUrl: './image-slider.css',
})



export class ImageSlider {

  @Input() images: string[] = [];            // массив URL изображений
  @Input() startIndex: number = 0;          // начальный индекс (по умолчанию 0)

  currentIndex: number = 0;                 // текущий индекс

  ngOnInit(): void {
    this.currentIndex = this.startIndex;
  }

  // Переключение на предыдущее изображение
  prev(): void {

    if (this.currentIndex == 0){
      this.currentIndex = this.images.length-1;
    }
    else{
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
    // console.log("индекс фото", this.currentIndex);
    
  }

  // Переключение на следующее изображение
  next(): void {

    if (this.currentIndex == this.images.length-1){
      this.currentIndex = 0;
    }
    else{
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        }
    }
    // console.log("индекс фото", this.currentIndex);
  }

  // Обработка клика по фото – листаем вперёд
  onImageClick(): void {
    this.next();
  }

  // Выбрать конкретное фото по индексу
  selectImage(index: number): void {
    this.currentIndex = index;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/image-placeholder.jpg';
  }

  onThumbnailError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/thumbnail-placeholder.jpg';
  }
  
}