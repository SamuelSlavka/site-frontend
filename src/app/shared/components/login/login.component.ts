import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private keycloakService: KeycloakService, private router: Router) {}
  logged$: Observable<boolean> | undefined;
  email: string = '';

  ngOnInit() {
    this.logged$ = from(this.keycloakService.isLoggedIn());
    this.email = this.keycloakService.getKeycloakInstance()?.tokenParsed?.['email'];
  }

  logout() {
    this.keycloakService.logout();
  }

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }
}
