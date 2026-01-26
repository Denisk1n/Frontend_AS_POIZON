import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Sneakers } from './pages/sneakers/sneakers';
import { Clothes } from './pages/clothes/clothes';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { SneakerInfo } from './pages/sneaker-info/sneaker-info';


export const routes: Routes = [
   {path: '', component: Home},
   {path: 'sneakers', component: Sneakers},
   {path: 'clothes', component: Clothes},
   {path: 'admin-panel', component: AdminPanel},
   {path: 'sneaker-info/:id', component: SneakerInfo},
   {path: 'sneakers/sneaker-info/:id', component: SneakerInfo}
];
