import { getUserGeography } from '../geography';

class GraphAuthentication {
  appConfig: { [key: string]: any };
  constructor(appConfig: { [key: string]: any }) {
    this.appConfig = appConfig;
    this.handleAzureLogin.bind(this);
    this.authenticateUser.bind(this);
    this.redirectToToken.bind(this);
  }
  handleAzureLogin() {
    let queryParams = {
      tenant: `common`,
      client_id: `${this.appConfig.azureAppClientId}`,
      response_type: 'code',
      scope: `https://graph.microsoft.com/${this.appConfig.azureScopes}`,
      redirect_uri: `${window.location.origin}${this.appConfig.appBaseName}${this.appConfig.finishAuthRedirectEndpoint}`,
    };
    let url = `${this.appConfig.azureAuthorizeUrl}`;
    let queryParamsString = new URLSearchParams(queryParams).toString();
    let authorizeEndpoint = url + queryParamsString;
    window.location.assign(authorizeEndpoint);
  }
  authenticateUser(redirectUri: string, onSuccess: (data: any) => void, onRejected: (reason: any) => void) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const errorDescription = urlParams.get('error_description');

    if (code) {
      const url = `${this.appConfig.serverBaseUrl}${this.appConfig.serverAuthEndpoint}`;
      if (typeof this?.redirectToToken === 'function') {
        this.redirectToToken(code, url, redirectUri).then(onSuccess, onRejected);
      }
    } else {
      onRejected(errorDescription);
    }
  }
  async redirectToToken(code: string, url: string, redirectUri: string) {
    const requestUrl = `${url}`;
    const userGeography = await getUserGeography();
    const authResults = await fetch(requestUrl, {
      method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        redirectUri: redirectUri,
        userGeography,
      }),
    }).catch(error => {
      console.log('error', error);
    });
    return await authResults?.json();
  }
}

export default GraphAuthentication;
