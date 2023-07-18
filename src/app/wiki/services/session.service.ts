import { Injectable, OnDestroy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  combineLatestWith,
  concatMap,
  filter,
  from,
  mergeMap,
  of,
  withLatestFrom,
} from 'rxjs';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnDestroy {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userId$: Subject<string | undefined> = new Subject();
  profile$: Subject<KeycloakProfile | undefined> = new BehaviorSubject<KeycloakProfile | undefined>(undefined);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  subscription: Subscription = new Subscription();

  constructor(private keycloakService: KeycloakService) {
    combineLatest([this.keycloakService.isLoggedIn()]).subscribe((res) => {
      console.log(res);
    });
    this.subscription.add(
      from(this.keycloakService.isLoggedIn()).subscribe((loggedIn) => {
        this.isLoggedIn$.next(loggedIn);
        if (loggedIn) {
          this.keycloakService.loadUserProfile().then((profile) => {
            this.profile$.next(profile);
            this.userId$.next(profile.id);
            this.isAdmin$.next(this.keycloakService.isUserInRole(UserRoles.ADMIN));
          });
        } else {
          this.profile$.next(undefined);
          this.userId$.next(undefined);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
