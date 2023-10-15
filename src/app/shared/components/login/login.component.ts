import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private keycloakService: KeycloakService,
    private sessionService: SessionService,
    private router: Router,
  ) {}
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;
  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;
  showActions$: BehaviorSubject<boolean> = this.sessionService.showActions$;
  profile$: Subject<KeycloakProfile | undefined> = this.sessionService.profile$;
  email: string = '';

  toggleShowActions() {
    const show = this.showActions$.getValue();
    this.sessionService.showActions$.next(!show);
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  logout() {
    const route = this.router.routerState.snapshot.url.split('/');
    switch (route[1]) {
      case 'wiki':
        this.keycloakService.logout(window.location.origin + '/wiki');
        break;
      default:
        this.keycloakService.logout(window.location.origin);
    }
  }

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }
}
