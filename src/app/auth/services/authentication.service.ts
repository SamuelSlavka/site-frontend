import { Injectable, OnDestroy } from "@angular/core";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Subject, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUserAuth } from "../interfaces/UserAuth";
import { IUserRegistration } from "../interfaces/UserRegistration";
import { IExternalAuth } from "../interfaces/ExternalAuth";
import { IAuthResponse } from "../../auth/interfaces/AuthResponse";
import { IRegistrationResponse } from "../interfaces/RegistrationResponse";
import { EnvironmentUrlService } from "../../core/services/environment-url.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService implements OnDestroy {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  private userSubscription!: Subscription;

  constructor(
    private readonly _http: HttpClient,
    private readonly _envUrl: EnvironmentUrlService,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _externalAuthService: SocialAuthService,
  ) {
    this.userSubscription = this._externalAuthService.authState.subscribe((user) => {
      console.log(user);
      this.extAuthChangeSub.next(user);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


  public registerUser = (route: string, body: IUserRegistration) => {
    return this._http.post<IRegistrationResponse> (this.createCompleteRoute(route, this._envUrl.url), body);
  }

  public loginUser = (route: string, body: IUserAuth) => {
    return this._http.post<IAuthResponse>(this.createCompleteRoute(route, this._envUrl.url), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
    this.signOutExternal();
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token ?? '');
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Administrator';
  }

  public signInWithGoogle = ()=> {
    this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }

  refreshToken(): void {
    this._externalAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  public externalLogin = (route: string, body: IExternalAuth) => {
    return this._http.post<IAuthResponse>(this.createCompleteRoute(route, this._envUrl.url), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
