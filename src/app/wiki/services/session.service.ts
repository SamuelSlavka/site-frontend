import { Injectable, OnDestroy } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, from, Subject, Subscription } from 'rxjs';

import { UserRoles } from '../enums/user-roles.enum';

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

  constructor(private keycloakService: KeycloakService) {
    this.profile$.next(undefined);
    this.userId$.next(undefined);
    this.isAdmin$.next(false);
    this.isLoggedIn$.next(false);
  }

  createSession() {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.profile$.next(profile);
      this.userId$.next(profile.id);
      this.isAdmin$.next(this.keycloakService.isUserInRole(UserRoles.ADMIN));
      this.isLoggedIn$.next(true);
      this.hasSession = true;
    });
  }

  deleteSession() {
    this.profile$.next(undefined);
    this.userId$.next(undefined);
    this.isAdmin$.next(false);
    this.isLoggedIn$.next(false);
    this.hasSession = false;
  }
}
