import RestClient from './restClient';

class GraphRestClient {
  private readonly _clientId: string;
  private readonly _secret: string;
  private readonly _scope: string;

  constructor(clientId: string, secret: string, scope: string) {
    this._clientId = clientId;
    this._secret = secret;
    this._scope = scope;
  }

  private getAccessTokenEndpoint(tenantId: string) {
    return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  }

  private async getAuthInfo(
    tenantId: string,
    redirectUri: string,
    { code, refreshToken }: { code?: string; refreshToken?: string }
  ) {
    const tokenUrl = this.getAccessTokenEndpoint(tenantId);
    const query = {
      client_id: this._clientId,
      client_secret: encodeURI(this._secret as string),
      scope: this._scope,
      redirect_uri: encodeURI(redirectUri),
      grant_type: refreshToken ? 'refresh_token' : 'authorization_code',
      ...(refreshToken ? { refresh_token: refreshToken } : { code }),
    };
    return await RestClient.formUrl(tokenUrl, query);
  }

  public async getTokenFromCode(tenantId: string, redirectUri: string, code: string) {
    return await this.getAuthInfo(tenantId, redirectUri, { code });
  }

  public async refreshToken(tenantId: string, redirectUri: string, refreshToken: string) {
    return await this.getAuthInfo(tenantId, redirectUri, { refreshToken });
  }
}

export default GraphRestClient;
