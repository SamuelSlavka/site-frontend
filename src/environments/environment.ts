export const environment = {
  appName: 'site-frontend',
  serverUrl: 'http://localhost:8090/api/v1/',
  production: false,
  i18nPrefix: '',
  defaultLanguage: 'en',
  configFile: 'assets/config.json',
  supportedLanguages: ['en'],
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080',
    // Realm
    realm: 'site',
    clientId: 'site-frontend',
  },
};
