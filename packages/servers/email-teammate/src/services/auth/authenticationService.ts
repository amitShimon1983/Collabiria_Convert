import { Response } from 'express';
import { UserModel } from '@harmonie/server-db';
import { logger } from '@harmonie/server-shared';
import { jwtProvider } from './index';
import { verifyToken } from './jwtProvider';
import { CookieType } from '../../consts';
import { cryptoClient, microsoftOAuthClient } from '../../clients';
import { geographyService } from '../geography';
import { userService } from '../user';
import { IAuthenticationModel } from '../../models';

const log = logger.createLogger();

const getActiveUserAuthData = async ({ token }: { token: string }) => {
  const authData = token ? await verifyToken(token || '') : null;
  let user;
  if (authData?.data._id) {
    user = await UserModel.findOne({ _id: authData?.data?._id }).lean();
  }
  return { authData, user };
};

const handleTokenReceived = async (
  data: any,
  userGeography: { timezone: string; utcOffset: string } | undefined,
  redirectUri: string,
  authResponse: any
) => {
  const { access_token, refresh_token, expires_in } = data;
  if (access_token && refresh_token && expires_in) {
    const graphJWT: any = jwtProvider.jwtDecode(access_token);

    try {
      const expiresIn = jwtProvider.setTokenExpiresIn(expires_in);
      const encryptedAccessToken = cryptoClient.encrypt(access_token);
      const encryptedRefreshToken = cryptoClient.encrypt(refresh_token);
      const geography = userGeography ? await geographyService.getGeography(userGeography) : undefined;
      const { oid, tid, upn } = graphJWT;
      const { user, isNewUser } = await userService.getOrCreateUser(
        upn,
        graphJWT,
        encryptedAccessToken,
        encryptedRefreshToken,
        expiresIn,
        redirectUri,
        geography,
        oid,
        tid
      );

      const encryptedToken = await jwtProvider.generateUserNewToken(
        user?._id || '',
        user?.firstName || '',
        user?.lastName || '',
        tid,
        user?.email || '',
        expires_in,
        graphJWT.iat
      );

      const userDetailsToken: string = await jwtProvider.generateUserDetailsNewToken(
        user?._id || '',
        user?.firstName || '',
        user?.lastName || '',
        tid,
        user?.email || ''
      );

      authResponse = { token: encryptedToken, user, isNewUser, userDetailsToken };
    } catch (error: any) {
      log.error(error, '[handleTokenReceived]');
    }
  }
  return authResponse;
};

const handleAuthenticationFailed = (data: any) => {
  // log.error({ ...data.error }, `[formatResponseFromGraphAuth]`);
  const authResponse: IAuthenticationModel = { statusCode: 400, error: { error: '' } };
  if (data.error === 'invalid_grant' || data.error === 'interaction_required') {
    authResponse.statusCode = 403;
    authResponse.error = { error: 'consent_required' };
  } else {
    authResponse.statusCode = 500;
    authResponse.error = { error: 'Could not exchange access token' };
  }
  return authResponse;
};

const formatResponseFromGraphAuth = async ({
  response,
  data,
  userGeography,
  redirectUri,
}: {
  response: any;
  redirectUri: string;
  data: any;
  userGeography?: { timezone: string; utcOffset: string };
}) => {
  let authResponse: any = {};
  if (!response.ok) {
    authResponse = handleAuthenticationFailed(data);
  } else {
    try {
      authResponse = await handleTokenReceived(data, userGeography, redirectUri, authResponse);
    } catch (error: any) {
      log.error(data.erro);
    }
  }
  return authResponse;
};

export const getTokenFromCode = async (
  code: string,
  redirectUri: string,
  userGeography?: { timezone: string; utcOffset: string }
) => {
  const { data, response } = await microsoftOAuthClient.getTokenFromCode('common', redirectUri, code);
  return await formatResponseFromGraphAuth({ response, data, userGeography, redirectUri });
};

export const refreshAccessToken = async (refreshToken: string, redirectUri: string) => {
  const { data, response } = await microsoftOAuthClient.refreshToken('common', redirectUri, refreshToken);
  return await formatResponseFromGraphAuth({ response, data, redirectUri });
};

export const setCookie = (res: Response, cookie: string) => {
  res?.cookie?.(
    CookieType.token,
    { token: cookie },
    {
      expires: new Date(Date.now() + 315360000000),
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    }
  );
};

export const clearCookie = (res: Response) => {
  res?.cookie?.(
    CookieType.token,
    { token: '' },
    {
      expires: new Date(Date.now()),
      maxAge: 0,
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    }
  );
};

export const authenticateUser = async ({ token }: { token: string }) => {
  let authData;

  try {
    const activeUserData = await getActiveUserAuthData({ token });
    if (activeUserData?.authData && activeUserData?.user) {
      let { token: userToken } = activeUserData?.user;
      const { refreshToken: userRefreshToken, redirectUri } = activeUserData?.user;
      authData = { ...activeUserData?.authData };
      const { name } = authData?.data;
      if (userRefreshToken && userToken) {
        if (authData?.error && authData?.error === 'TokenExpiredError') {
          const refreshResult: any = (await refreshAccessToken(
            cryptoClient.decrypt(userRefreshToken),
            redirectUri
          )) as any;
          if (refreshResult?.error && refreshResult?.error?.error === 'consent_required') {
            return { isAuthenticate: false };
          }

          delete authData.error;
          userToken = cryptoClient.decrypt(refreshResult.user?.token || '');
          return {
            isAuthenticate: true,
            payload: {
              ...(authData.data || {}),
              name: name || `${activeUserData?.user.firstName} ${activeUserData?.user.lastName}`,
              token: userToken,
              cookie: refreshResult.token,
              userDetailsToken: refreshResult?.userDetailsToken || {},
            },
          };
        }
        const encryptedToken = await jwtProvider.generateUserNewToken(
          authData?.data._id || '',
          authData?.data.name || '',
          '',
          authData?.data.tid,
          authData?.data?.upn || '',
          authData?.data.tokenExpiration,
          authData.iat
        );
        return {
          isAuthenticate: true,
          payload: {
            ...(authData?.data || {}),
            name: name || `${activeUserData?.user.firstName} ${activeUserData?.user.lastName}`,
            token: cryptoClient.decrypt(userToken),
            userDetailsToken: encryptedToken,
          },
        };
      }
    }
    return { isAuthenticate: false };
  } catch (error) {
    return { error };
  }
};
