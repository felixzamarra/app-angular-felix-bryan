import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
{ path: 'cubos', loadComponent: () => import('./pages/cubos/cubos').then(m => m.Cubos) }];