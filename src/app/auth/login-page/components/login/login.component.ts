import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _socialAuthService: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this._socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  form: FormGroup = this._fb.group({ username: [], password: [] });

  loginUser() {
    this._authService.loginUser(this.form.value)
  }
  logOut(): void {
    this._authService.logout();
  }
}
