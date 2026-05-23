import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login)
  },

  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard)
  },

  {
    path: 'reservas',
    loadComponent: () =>import('./features/reservas/pages/reservas/reservas').then(m => m.Reservas)
  }
];
