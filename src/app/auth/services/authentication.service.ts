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
import { filter } from "rxjs";
import { Store } from "@ngrx/store";
import { ExternalLoginRequestAction } from "../../root-store/session-store/actions";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _store: Store,
    private readonly _envUrl: EnvironmentUrlService,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _externalAuthService: SocialAuthService,
  ) {
    this._externalAuthService.authState
      .pipe(
        untilDestroyed(this),
        filter((user) => user != undefined),
      )
      .subscribe((user: SocialUser) => {
        const exteralAuth = { idToken: user?.idToken, provider: "google", email: user?.authToken };
        this._store.dispatch(ExternalLoginRequestAction({ exteralAuth }));
      });
  }

  public signOutWithGoogle() {
    return this._externalAuthService.signOut();
  }

  public registerUser(body: IUserRegistration) {
    return this._http.post<IRegistrationResponse>(this._envUrl.url, body);
  }

  public loginUser(body: IUserAuth) {
    return this._http.post<IAuthResponse>(this._envUrl.url, body);
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  public validateExternal(externalAuth: IExternalAuth) {
    return this._http.post<IAuthResponse>("api/accounts/externallogin", externalAuth);
  }

  public refreshToken(): void {
    this._externalAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
