import { Injectable } from "@angular/core";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUserAuth } from "../interfaces/UserAuth";
import { IUserRegistration } from "../interfaces/UserRegistration";
import { IAuthResponse } from "../../auth/interfaces/AuthResponse";
import { IRegistrationResponse } from "../interfaces/RegistrationResponse";
import { EnvironmentUrlService } from "../../core/services/environment-url.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _envUrl: EnvironmentUrlService,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _externalAuthService: SocialAuthService,
  ) {
    this._externalAuthService.authState.pipe(untilDestroyed(this)).subscribe((user) => {
      localStorage.setItem("token", JSON.stringify(user.idToken));
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
    localStorage.removeItem("token");
    this.signOutWithGoogle();
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  public isUserAdmin(): boolean {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token ?? "");
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return role === "Administrator";
  }

  public refreshToken(): void {
    this._externalAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
