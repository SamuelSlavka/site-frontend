import { Component } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  constructor(private readonly _authService: AuthenticationService) {}

  logout() {
    this._authService.logout();
  }
}
