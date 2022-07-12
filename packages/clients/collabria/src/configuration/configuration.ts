declare const window: {
  REACT_APP_AZURE_CLIENT_ID: string;
  REACT_APP_AZURE_CLIENT_SCOPE: string;
  REACT_APP_SERVER_BASE_URL: string;
  REACT_APP_EXTERNAL_SITE_END_POINT: string;
};

export class Configuration {
  azureAppClientId?: string;
  azureScopes?: string;
  azureAuthorizeUrl?: string;
  finishAuthRedirectEndpoint?: string;
  serverAuthEndpoint?: string;
  serverBaseUrl?: string;
  appBaseName?: string;
  externalSiteUrl?: string;

  constructor() {
    this.azureAppClientId = process.env.REACT_APP_AZURE_CLIENT_ID || window.REACT_APP_AZURE_CLIENT_ID;
    this.azureScopes = process.env.REACT_APP_AZURE_CLIENT_SCOPE || window.REACT_APP_AZURE_CLIENT_SCOPE;
    this.serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || window.REACT_APP_SERVER_BASE_URL;
    this.externalSiteUrl = process.env.REACT_APP_EXTERNAL_SITE_END_POINT || window.REACT_APP_EXTERNAL_SITE_END_POINT;
    this.azureAuthorizeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
    this.finishAuthRedirectEndpoint = '/auth/end';
    this.serverAuthEndpoint = '/api/graph/auth-return';
    this.appBaseName = '/collabria';
  }
}

class AppConfig {
  private static config: Configuration;

  static init() {
    if (!this.config) {
      this.config = new Configuration();
    }
  }
  static getConfig(): Configuration {
    if (!this.config) {
      this.init();
    }
    return this.config;
  }
}
export default AppConfig.getConfig();
