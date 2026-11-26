import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-login-prompt',
    templateUrl: './login-prompt.component.html',
    styleUrls: ['./login-prompt.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LoginPromptComponent {
  private keycloakService = inject(KeycloakService);
  private router = inject(Router);
  private bsModalRef = inject(BsModalRef);

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
