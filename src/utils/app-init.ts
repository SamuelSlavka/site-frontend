import { KeycloakService } from 'keycloak-angular';
import { environment } from '../enviroments/enviroment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },
          loadUserProfileAtStartUp: false,
          initOptions: {
            //   This is an action we specified on keycloak load
            //   We have two options : 'login-required'|'check-sso'
            //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.
            //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
            //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
            // <html>
            //    <body>
            //         <script>
            //           parent.postMessage(location.href, location.origin);
            //         </script>
            //      </body>
            // </html>
            onLoad: 'check-sso',
            checkLoginIframe: true,
            // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
          // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
          bearerExcludedUrls: ['/assets'],
        });
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
