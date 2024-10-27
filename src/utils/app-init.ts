import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService) {
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
          onLoad: 'check-sso',
          messageReceiveTimeout: 1000,
          checkLoginIframe: true,
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: ['/assets'],
      })
      .catch((e) => {
        console.log('keycloak init failed', e);
      });
}
