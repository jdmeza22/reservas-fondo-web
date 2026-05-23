import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register)
  },

  {
    canActivate: [ authGuard ],
    path: 'dashboard',
    loadComponent: () => import('./core/layouts/main-layout-component/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },

  {
    canActivate: [ authGuard ],
    path: 'reservas',
    loadComponent: () => import('./core/layouts/main-layout-component/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/reservas/pages/reservas/reservas.component').then(m => m.Reservas)
      }
    ]
  }
];
