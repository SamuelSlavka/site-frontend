import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IExternalAuth } from "../../../interfaces/ExternalAuth";
import { IAuthResponse } from "../../../interfaces/AuthResponse";
import { IUserAuth } from "../../../interfaces/UserAuth";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = "";
  returnUrl: string = "";

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  form: FormGroup = this._fb.group({ username: [], password: [] });

  loginUser() {
    this.showError = false;
    const login = this.form.value;

    const userForAuth: IUserAuth = {
      email: login.username,
      password: login.password,
      clientURI: "http://localhost:4200/authentication/forgotpassword",
    };

    this._authService.loginUser("api/accounts/login", userForAuth).subscribe({
      next: (res: IAuthResponse) => {
        if (res.is2StepVerificationRequired) {
          this._router.navigate(["/authentication/twostepverification"], {
            queryParams: { returnUrl: this.returnUrl, provider: res.provider, email: userForAuth.email },
          });
        } else {
          localStorage.setItem("token", res.token);
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this.returnUrl]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      },
    });
  }

  finishLogin(props: any) {
    console.log(props);
  }
  externalLogin = () => {
    this.showError = false;
    this._authService.signInWithGoogle();

    this._authService.extAuthChanged.subscribe((user) => {
      const externalAuth: IExternalAuth = {
        provider: user.provider,
        idToken: user.idToken,
      };

      this.validateExternalAuth(externalAuth);
    });
  };

  private validateExternalAuth(externalAuth: IExternalAuth) {
    this._authService.externalLogin("api/accounts/externallogin", externalAuth).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this._router.navigate([this.returnUrl]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
        this._authService.signOutExternal();
      },
    });
  }
}
