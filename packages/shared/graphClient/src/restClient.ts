import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

export const refreshToken = async ({
  tokenEndpoint,
  tenantId,
  appClientId,
  appClientSecret,
  appScope,
  redirectUri,
  refreshToken,
}: {
  tokenEndpoint: string;
  tenantId: string;
  appClientId: string;
  appClientSecret: string;
  appScope: string;
  redirectUri: string;
  refreshToken: string;
}) => {
  const accessTokenEndpoint = tokenEndpoint.replace('{tenantId}', tenantId);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: appClientId,
      client_secret: encodeURI(appClientSecret as string),
      scope: appScope,
      redirect_uri: encodeURI(redirectUri),
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  };

  const response = await fetch(accessTokenEndpoint, options);
  return await response.json();
};

export const postFetch = async (endpoint: string, data: any) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(endpoint, options);
  if (response.status === 200) {
    return (await response.json()) as any;
  }
  const text = (await response.text()) as any;
  throw new Error(text || response.statusText);
};
