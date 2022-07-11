import { restClient } from '@harmonie/graph-client';
import { UserModel } from '@harmonie/db';
import { crypto } from './crypto';

const { AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_CLIENT_SCOPE, tokenEndpoint } = process.env;

if (!AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET || !AZURE_CLIENT_SCOPE || !tokenEndpoint) {
  console.error(new Error('[subscriptions] app client is not configured, check function app configuration.'));
}

export const getNewAccessToken = async (
  userRefreshToken: string,
  redirectUri: string,
  tenantId: string
): Promise<string> => {
  const refreshToken = crypto.decrypt(userRefreshToken);
  const options = {
    appClientId: AZURE_CLIENT_ID,
    appClientSecret: AZURE_CLIENT_SECRET,
    appScope: AZURE_CLIENT_SCOPE,
    tokenEndpoint,
    redirectUri,
    refreshToken,
    tenantId,
  };
  const authData = await restClient.refreshToken(options);
  if (authData.error) {
    throw new Error(authData.error_description);
  }
  return authData.access_token;
};

// recursive function that will get token from user[i] and try to run the func.
// if failed, will try with next user token.
export const recursiveWithUsers = async (
  func: (token: string) => Promise<any>,
  users: any[],
  onError?: (error: Error, userId: string) => Promise<any>,
  i = 0,
  limit = 10
): Promise<any | undefined> => {
  if (i >= users.length || i >= limit) {
    return Promise.resolve(undefined);
  }

  const { refreshToken, redirectUri, tenantId, userId } = users[i];

  try {
    const token = await getNewAccessToken(refreshToken, redirectUri, tenantId);
    return await func(token);
  } catch (e) {
    if (e.statusCode === 401 || e.message === 'Access token has expired or is not yet valid.') {
      console.warn(
        `[subscriptions-recursiveWithUsers] couldn't run function with user token (${e.message}), retrying with next user...`
      );
      await onError?.(e, users[i]?.userId);
      return await recursiveWithUsers(func, users, onError, i + 1);
    }
    throw new Error(
      `[subscriptions-recursiveWithUsers] couldn't refresh token for user ${userId}, error: (${e.message})`
    );
  }
};

export const recursiveWithTaskBoards = async (
  func: (token: string) => Promise<any>,
  taskBoards: any[],
  i = 0,
  limit = 10
): Promise<any | undefined> => {
  if (i >= taskBoards.length || i >= limit) {
    return Promise.resolve(undefined);
  }
  const { creator, users } = taskBoards[i];
  const createdBy = await UserModel.findOne({ id: creator });
  const taskBoardUsers = [createdBy, ...users];

  const result = await recursiveWithUsers(func, taskBoardUsers);
  if (result) {
    return result;
  }
  return await recursiveWithTaskBoards(func, taskBoards, i + 1);
};
