import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        canActivate: [],
        loadComponent: () => import('./dashboard/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
      },
      {
        path: 'privacy',
        canActivate: [],
        loadComponent: () => import('./privacy/privacy.component').then((m) => m.PrivacyComponent),
      },
      {
        path: 'wiki',
        canActivate: [],
        loadComponent: () => import('./wiki/wiki-page/wiki-page.component').then((m) => m.WikiPageComponent),
      },
      {
        path: 'wiki/:id',
        canActivate: [],
        loadComponent: () => import('./wiki/article-page/article-page.component').then((m) => m.ArticlePageComponent),
      },
      {
        path: 'smart',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./smart-home/smart-home-page/smart-home-page.component').then((m) => m.SmartHomePageComponent),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'access-denied',
        canActivate: [],
        loadComponent: () =>
          import('./shared/components/access-denied/access-denied.component').then((m) => m.AccessDeniedComponent),
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'game',
        canActivate: [],
        loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
