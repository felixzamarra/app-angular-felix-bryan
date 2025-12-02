import { Routes } from '@angular/router';
import { SeccionUsuario } from './components/seccion-usuario/seccion-usuario';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
  { path: 'cubos', loadComponent: () => import('./pages/cubos/cubos').then(m => m.Cubos) },
  { path: 'tutoriales', loadComponent: () => import('./pages/tutorial/tutorial').then(m => m.Tutorial) },
  { path: 'historia', loadComponent: () => import('./pages/historia/historia').then(m => m.Historia) },
  { path: 'seccion-usuario', component: SeccionUsuario }
];