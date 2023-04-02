import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./core/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    canActivate: [],
    children: [
      {
        path: "login",
        canActivate: [],
        loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: "dashboard",
        canActivate: [],
        loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "privacy",
        canActivate: [],
        loadChildren: () => import("./privacy/privacy.module").then((m) => m.PrivacyModule),
      },
      {
        path: "home",
        canActivate: [],
        loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
