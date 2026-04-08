import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class AdminHeader implements OnInit, OnDestroy {
  showAddButton: Boolean = true;
  header_text: string = 'Товары';
  private routerSubscription!: Subscription;

  constructor(private router: Router) {

  }

  ngOnInit(){
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateUI(); // Вызывается при КАЖДОМ переходе
      });
  }


  private updateUI() {
    const currentUrl = this.router.url;
    console.log(currentUrl);

    if (currentUrl.includes('admin/main-table')) {
      this.showAddButton = true;
      this.header_text = "Товары";
    } else {
      this.showAddButton = false;
      this.header_text = "Редактирование товара";
    }

    console
  }


  ngOnDestroy() {
    // Отписываемся при уничтожении компонента
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


}
