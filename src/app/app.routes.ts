import { Routes } from '@angular/router';
import { componentRoutes } from './components/component.routes';
import { CommonComponent } from './components/common-component/common-component';

export const routes: Routes = [
  // Authentication Routes (outside main layout)
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.Login),
  },
  // TODO: Add register and forgot-password routes when components are created
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./auth/register/register').then((m) => m.Register),
  // },
  // {
  //   path: 'forgot-password',
  //   loadComponent: () =>
  //     import('./auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  // },
  
  // Main Application Routes (with layout)
  {
    path: '',
    component: CommonComponent,
    children: componentRoutes,
    // canActivate: [AuthGuard], // Add auth guard to protect routes
  },
  
  // Redirect unknown routes
  {
    path: '**',
    redirectTo: 'login', // Redirect to login for unauthenticated users
    pathMatch: 'full'
  }
];
