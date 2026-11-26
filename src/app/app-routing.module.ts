import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';

const routes: Routes = [
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
        title: 'Dashboard',
        canActivate: [],
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'privacy',
        title: 'Privacy',
        canActivate: [],
        loadChildren: () => import('./privacy/privacy.module').then((m) => m.PrivacyModule),
      },
      {
        path: 'wiki',
        title: 'Wiki',
        canActivate: [],
        loadChildren: () => import('./wiki/wiki.module').then((m) => m.WikiModule),
      },
      {
        path: 'smart',
        title: 'Smart home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./smart-home/smart-home.module').then((m) => m.SmartHomeModule),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'access-denied',
        title: 'Access denied',
        component: AccessDeniedComponent,
        canActivate: [],
      },
      {
        path: 'admin',
        title: 'Admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  {
    path: '**',
    title: 'Not found',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
