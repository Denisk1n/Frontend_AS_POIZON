import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, HostListener, Input } from '@angular/core';
import { FiltersLogic } from '../../services/filters-logic';


interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-drop-down-menu',
  imports: [CommonModule],
  templateUrl: './drop-down-menu.html',
  styleUrl: './drop-down-menu.css',
})

export class DropDownMenu {


  // Опции сортировки (4 пункта)
  sortOptions: SortOption[] = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'price-asc', label: 'Цена: По возрастанию' },
    { value: 'price-desc', label: 'Цена: По убыванию' },
    { value: 'new', label: 'Новые' }
  ];

  constructor(public allFilters: FiltersLogic) {}

  // Открыто ли меню
  isOpen = false;
  
  // Событие при изменении сортировки
  @Output() sortChanged = new EventEmitter<string>();
  
  // Закрывать меню при клике вне компонента
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen) return;
    
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.sort-dropdown');
    
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  // Переключить меню
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // Выбрать опцию
  selectOption(value: string): void {
    this.allFilters.setSorted(value);
    this.isOpen = false;
    this.sortChanged.emit(value);
    console.log("фильтры: ",this.allFilters.getFilters()
    )
  }

  // Получить текст выбранной опции
  getSelectedLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.allFilters.getSorted());
    return option ? option.label : 'По умолчанию';
  }
}
