import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return () =>
    keycloak
      .init({
        config: {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        loadUserProfileAtStartUp: false,
        initOptions: {
          messageReceiveTimeout: 1000,
          onLoad: 'check-sso',
          checkLoginIframe: true,
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: ['/assets'],
      })
      .catch(() => {
        /* error handling */
      });
}
