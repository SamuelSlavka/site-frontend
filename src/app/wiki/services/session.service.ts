import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private keycloakService = inject(KeycloakService);

  public hasSession = false;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId$ = new Subject<string | undefined>();
  profile$: Subject<KeycloakProfile | undefined> = new BehaviorSubject<KeycloakProfile | undefined>(undefined);
  isAdmin$ = new BehaviorSubject<boolean>(false);
  showActions$ = new BehaviorSubject<boolean>(true);
  isProd = environment.production;

  constructor() {
    this.profile$.next(undefined);
    this.userId$.next(undefined);
    this.isAdmin$.next(this.isProd ? false : true);
    this.isLoggedIn$.next(false);
  }

  createSession() {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.profile$.next(profile);
      this.userId$.next(profile.id);
      this.isAdmin$.next(this.isProd ? this.keycloakService.isUserInRole(UserRoles.ADMIN) : true);
      this.isLoggedIn$.next(true);
      this.hasSession = true;
    });
  }

  deleteSession() {
    this.profile$.next(undefined);
    this.userId$.next(undefined);
    this.isAdmin$.next(this.isProd ? false : true);
    this.isLoggedIn$.next(false);
    this.hasSession = false;
  }
}
