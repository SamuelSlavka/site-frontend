import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private keycloakService: KeycloakService,
    private sessionService: SessionService,
    private router: Router,
  ) {}
  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;
  profile$: Subject<KeycloakProfile | undefined> = this.sessionService.profile$;
  email: string = '';

  logout() {
    this.keycloakService.logout();
  }

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }
}
