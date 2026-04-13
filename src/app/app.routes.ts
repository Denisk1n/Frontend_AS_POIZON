import { Routes, RouterModule } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';


export const routes: Routes = [

   {
      path: '',
      component: MainLayout,
      children: [
         {
            path: '',
            loadComponent: () => import('./pages/home/home').then(m => m.Home)
         },
         {
            path: 'sneakers',
            loadComponent: () => import('./pages/sneakers/sneakers').then(m => m.Sneakers)
         },
         {
            path: 'clothes',
            loadComponent: () => import('./pages/clothes/clothes').then(m => m.Clothes)
         },
         {
            path: 'sneaker-info/:id',
            loadComponent: () => import('./pages/sneaker-info/sneaker-info').then(m => m.SneakerInfo),
            runGuardsAndResolvers: 'always'
         }
      ]
   },
   {
      path: 'admin',
      component: AdminLayout,
      children: [
         {
            path: 'main-table',
            loadComponent: () => import('./pages/admin-panel/admin-panel').then(m => m.AdminPanel)
         },
         {
            path: 'product-info/create',
            loadComponent: () => import('./pages/admin-product-info/admin-product-info').then(m => m.AdminProductInfo)
         },
         {
            path: 'product-info/edit/:id',
            loadComponent: () => import('./pages/admin-product-info/admin-product-info').then(m => m.AdminProductInfo)
         }
      ]
   }
   
];
