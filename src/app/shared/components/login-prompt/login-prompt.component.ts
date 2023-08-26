import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPromptComponent {
  constructor(private keycloakService: KeycloakService, private router: Router, private bsModalRef: BsModalRef) {}

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
