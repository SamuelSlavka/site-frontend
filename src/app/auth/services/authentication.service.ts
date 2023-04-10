import { Injectable } from "@angular/core";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUserAuth } from "../interfaces/UserAuth";
import { IUserRegistration } from "../interfaces/UserRegistration";
import { IAuthResponse } from "../../auth/interfaces/AuthResponse";
import { IRegistrationResponse } from "../interfaces/RegistrationResponse";
import { EnvironmentUrlService } from "../../core/services/environment-url.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IExternalAuth } from "../interfaces/ExternalAuth";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, filter } from "rxjs";
import { ISession } from "../interfaces/Session";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public session = new BehaviorSubject<ISession>({ email: "", idToken: "", loggedin: false });

  constructor(
    private readonly _http: HttpClient,
    private readonly _envUrl: EnvironmentUrlService,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _toastrService: ToastrService,
    private readonly _externalAuthService: SocialAuthService,
  ) {
    this._externalAuthService.authState
      .pipe(
        untilDestroyed(this),
        filter((user) => user != undefined),
      )
      .subscribe((user: SocialUser) => {
        this.validateExternalAuth({ idToken: user?.idToken, provider: "google", email: user?.authToken });
      });
  }

  private signOutWithGoogle() {
    this._externalAuthService.signOut();
  }

  public registerUser(body: IUserRegistration) {
    return this._http.post<IRegistrationResponse>(this._envUrl.url, body);
  }

  public loginUser(body: IUserAuth) {
    return this._http.post<IAuthResponse>(this._envUrl.url, body);
  }

  public logout() {
    console.log("out");
    this.session.next({ idToken: "", email: "", loggedin: false });
    localStorage.removeItem("token");
    this.signOutWithGoogle();
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  private validateExternalAuth(externalAuth: IExternalAuth) {
    this._http.post<IAuthResponse>("api/accounts/externallogin", externalAuth).subscribe({
      next: (res: IAuthResponse) => {
        localStorage.setItem("token", res.token);

        this.session.next({ idToken: res.token, email: externalAuth.email, loggedin: true });
        this._toastrService.success("Signed in");
      },
      error: () => {
        this.signOutWithGoogle();
        this.session.next({ idToken: "", email: "", loggedin: false });
        this._toastrService.error("Failed to sign in");
      },
    });
  }

  public refreshToken(): void {
    this._externalAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
