import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './pages/home/home';
import { Sneakers } from './pages/sneakers/sneakers';
import { Clothes } from './pages/clothes/clothes';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { SneakerInfo } from './pages/sneaker-info/sneaker-info';
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
            path: 'panel',
            loadComponent: () => import('./pages/admin-panel/admin-panel').then(m => m.AdminPanel)
         }
      ]
   }
   
];
