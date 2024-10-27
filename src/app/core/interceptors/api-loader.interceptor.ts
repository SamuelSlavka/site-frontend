import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { SessionService } from '@app/wiki/services/session.service';

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
  constructor(protected readonly keycloak: KeycloakService, protected readonly sessionService: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const logged = this.keycloak.isLoggedIn();
    if (this.sessionService.hasSession && !logged) {
      this.sessionService.deleteSession();
    } else if (!this.sessionService.hasSession && logged) {
      this.sessionService.createSession();
    }
    return next.handle(request);
  }
}
