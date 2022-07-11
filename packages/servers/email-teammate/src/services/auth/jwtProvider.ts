import { AzureKeyVault } from '@harmonie/server-shared';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const generateToken = async (tokenData: any, expiresIn: number) => {
  const secret = await getSecret();
  try {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + expiresIn,
        data: tokenData,
      },
      secret
    );
    return token;
  } catch (error: any) {
    throw error;
  }
};

export const jwtDecode = (token: string) => jwt.decode(token);

export const verifyToken = async (token?: string) => {
  if (!token) {
    return;
  }
  const secret = await getSecret();
  try {
    const decrypt: any = jwt.verify(token, secret);
    const milliseconds = (decrypt.exp - 180) * 1000;
    const nowMilliseconds = new Date().getTime();
    if (nowMilliseconds >= milliseconds)
      return {
        error: 'TokenExpiredError',
        ...(jwtDecode(token) as any),
      };
    return decrypt;
  } catch (err) {
    // logger.error(err.message);
    // console.log('err', err?.message);
    return {
      error: 'TokenExpiredError',
      ...(jwtDecode(token) as any),
    };
  }
};

async function getSecret() {
  let secret: string;
  try {
    secret = await AzureKeyVault.getSecretValue(config.tokenSecretName);
  } catch (error: any) {
    secret = 'secret';
    console.error(`[getSecret]-${error.message}`);
  }
  return secret;
}

export function setTokenExpiresIn(expiresIn: number) {
  const milliseconds = (expiresIn - 120) * 1000;
  const expirationDate = new Date(new Date().getTime() + milliseconds);
  return expirationDate;
}

const issueAt = (currentTime: any) => new Date((currentTime - 300 || 0) * 1000).getTime();

export async function generateUserNewToken(
  userId: string,
  firstName: string,
  lastName: string,
  tid: any,
  email: any,
  expires_in: any,
  iat: any
) {
  const newToken = {
    _id: userId,
    name: `${lastName} ${firstName}`,
    tid,
    upn: email,
    tokenExpiration: expires_in,
    issueAt: issueAt(iat),
  };
  const encryptedToken = await generateToken(newToken, expires_in);
  return encryptedToken;
}

export async function generateUserDetailsNewToken(
  userId: string,
  firstName: string,
  lastName: string,
  tid: any,
  email: any,
  rest?: { [key: string]: any }
): Promise<string> {
  const newToken = {
    _id: userId,
    name: `${lastName} ${firstName}`,
    tid,
    upn: email,
    ...(rest || {}),
  };
  const maxDate = new Date(8640000000000000);
  const encryptedToken = await generateToken(newToken, maxDate.getTime());
  return encryptedToken;
}
