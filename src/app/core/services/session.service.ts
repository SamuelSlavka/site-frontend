import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from '@env/environment';
import { UserRoles } from '@app/core/enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public hasSession = false;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userId$: Subject<string | undefined> = new Subject();
  profile$: Subject<KeycloakProfile | undefined> = new BehaviorSubject<KeycloakProfile | undefined>(undefined);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showActions$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isProd = environment.production;

  constructor(private keycloakService: KeycloakService) {
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
