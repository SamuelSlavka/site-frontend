export const environment = {
  appName: 'site-frontend',
  serverUrl: 'https://api.samsla.org/api/v1/',
  wsUrl: 'wss://api.samsla.org/game',
  production: true,
  i18nPrefix: '',
  defaultLanguage: 'en',
  configFile: 'assets/config.json',
  supportedLanguages: ['en'],
  keycloak: {
    // Url of the Identity Provider
    issuer: 'https://keycloak.samsla.org',
    // Realm
    realm: 'site',
    clientId: 'site-frontend',
  },
};
