import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'lazy-loaded',
    loadComponent: () =>
      import('./pages/lazy-loaded/lazy-loaded.component').then((m) => m.LazyLoadedComponent),
  },
  {
    path: 'real-estate',
    loadChildren: () =>
      import('./modules/real-estate/real-estate.module').then((m) => m.RealEstateModule),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
