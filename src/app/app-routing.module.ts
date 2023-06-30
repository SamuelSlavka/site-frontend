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
        canActivate: [],
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'privacy',
        canActivate: [],
        loadChildren: () => import('./privacy/privacy.module').then((m) => m.PrivacyModule),
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        canActivate: [],
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        // The user need to have this roles to access
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
