import { Routes } from '@angular/router';
import { SeccionUsuario } from './components/seccion-usuario/seccion-usuario';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
{ path: 'cubos', loadComponent: () => import('./pages/cubos/cubos').then(m => m.Cubos) },
  { path: 'seccion-usuario', component: SeccionUsuario }
];
