import { Routes } from '@angular/router';

export const componentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('./groups/groups').then((m) => m.Groups),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./expenses/expenses').then((m) => m.Expenses),
  },
  {
    path: 'friends',
    loadComponent: () =>
      import('./friends/friends').then((m) => m.Friends),
  },
  {
    path: 'activity',
    loadComponent: () =>
      import('./activity/activity').then((m) => m.Activity),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile').then((m) => m.Profile),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings').then((m) => m.Settings),
  },
  // Add more routes as needed
];
