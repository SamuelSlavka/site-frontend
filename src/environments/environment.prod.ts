export const environment = {
  appName: 'site-frontend',
  serverUrl: 'https://api.sam-sla.net/api/v1/',
  production: true,
  i18nPrefix: '',
  defaultLanguage: 'en',
  configFile: 'assets/config.json',
  supportedLanguages: ['en'],
  keycloak: {
    // Url of the Identity Provider
    issuer: 'https://keycloak.sam-sla.net/',
    // Realm
    realm: 'site',
    clientId: 'site-frontend',
  },
};
