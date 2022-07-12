declare const window: {
  REACT_APP_AZURE_CLIENT_ID: string;
  REACT_APP_AZURE_CLIENT_SCOPE: string;
  REACT_APP_SERVER_BASE_URL: string;
  REACT_APP_AZURE_AUTHORIZED_URL: string;
  REACT_APP_FINISH_AUTH_REDIRECT_URL: string;
  REACT_APP_SERVER_AUTH_ENDPOINT: string;
  REACT_APP_APP_BASE_NAME: string;
  REACT_APP_APP_CHARGE_BEE_PLAN: string;
  REACT_APP_APP_CHARGE_BEE_ENV: string;
};

export class Configuration {
  azureAppClientId?: string;
  azureScopes?: string;
  azureAuthorizeUrl?: string;
  finishAuthRedirectEndpoint?: string;
  serverAuthEndpoint?: string;
  serverBaseUrl?: string;
  appBaseName?: string;
  chargebeeEnv?: string;
  chargebeePlan?: string;
  constructor() {
    this.azureAppClientId = process.env.REACT_APP_AZURE_CLIENT_ID || window.REACT_APP_AZURE_CLIENT_ID;
    this.azureScopes = process.env.REACT_APP_AZURE_CLIENT_SCOPE || window.REACT_APP_AZURE_CLIENT_SCOPE;
    this.serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || window.REACT_APP_SERVER_BASE_URL;
    this.chargebeeEnv = process.env.REACT_APP_APP_CHARGE_BEE_ENV || window.REACT_APP_APP_CHARGE_BEE_ENV;
    this.chargebeePlan = process.env.REACT_APP_APP_CHARGE_BEE_PLAN || window.REACT_APP_APP_CHARGE_BEE_PLAN;
    this.serverAuthEndpoint = '/api/graph/auth-return';
    this.azureAuthorizeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
    this.appBaseName = '/email-teammate';
    this.finishAuthRedirectEndpoint = '/auth/end';
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
