import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login-page/components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleSigninButtonModule, SocialLoginModule } from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [SocialLoginModule, CommonModule, ReactiveFormsModule, AuthRoutingModule, GoogleSigninButtonModule],
  providers: [
  ],
})
export class AuthModule {}
