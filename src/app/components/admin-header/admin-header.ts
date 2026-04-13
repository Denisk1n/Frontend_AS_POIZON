import { Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})

export class AdminHeader {

  showAddButton: Boolean = true;
  header_text: string = 'Товары';
  
  private routerSubscription!: Subscription;

  constructor(
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateUI(); // Вызывается при КАЖДОМ переходе
      });

    this.updateUI();
  }


  updateUI() {
    const currentUrl = this.router.url;
    //console.log(currentUrl);

    if (currentUrl.includes('/main-table')) {
      this.showAddButton = true;
      this.header_text = "Товары";
    }; 
    if (currentUrl.includes('/product-info/create')){
      this.showAddButton = false;
      this.header_text = "Создание товара";
    };
    if (currentUrl.includes('/product-info/edit')){
      this.showAddButton = false;
      this.header_text = "Редактирование товара";
    }
    if (currentUrl.includes('/settings')){
      this.showAddButton = false;
      this.header_text = "Настройки";
    }

  }



  goToCreateProduct(){
    this.router.navigate(['admin/product-info', 'create'], {
      queryParams: {},
      queryParamsHandling: ''
    });
    this.cdr.detectChanges();
  }


}
