export default class Configuration {
  azureClientId: string;
  azureClientSecret: string;
  azureClientScope: string;
  tokenSecretName: string;
  allowedOrigins: string[];
  port: number;
  dbConnectionString: string;
  vaultConnectionString: string;
  blobConnectionString: string;
  cryptoAlgorithm: string;
  cryptoSecret: string;
  cryptoIV: string;
  externalSiteUrl: string;
  serverBaseUrl: string;
  xFrameOption: string;

  constructor(env: { [key: string]: any }) {
    this.azureClientId = env.AZURE_CLIENT_ID;
    this.azureClientScope = env.AZURE_CLIENT_SCOPE;
    this.azureClientSecret = env.AZURE_CLIENT_SECRET;
    this.tokenSecretName = env.TOKEN_SECRET_NAME;
    this.port = env.PORT || 3978;
    this.allowedOrigins = env.ALLOWED_ORIGINS?.split(',');
    this.dbConnectionString = env.DB_CONNECTION_STRING;
    this.vaultConnectionString = env.VAULT_URL;
    this.blobConnectionString = env.BLOB_CONNECTION_STRING;
    this.cryptoAlgorithm = env.CRYPTO_ALGORITHM;
    this.cryptoSecret = env.CRYPTO_SECRET;
    this.cryptoIV = env.CRYPTO_IV;
    this.externalSiteUrl = env?.EXTERNAL_SITE_END_POINT || 'No Value';
    this.serverBaseUrl = env.SERVER_BASE_URL;
    this.xFrameOption = env?.X_FRAME_OPTION || '';
  }
}
