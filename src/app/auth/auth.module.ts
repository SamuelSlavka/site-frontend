import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login-page/components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [SocialLoginModule, CommonModule, ReactiveFormsModule, AuthRoutingModule],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "338179295505-7im0prahsgculr64vspgntnq1gpgnn3t.apps.googleusercontent.com",
              {
                scopes: "email",
              },
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthModule {}
