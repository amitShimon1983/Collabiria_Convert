import { HttpRequest } from '@azure/functions';
import { Crypto } from '@harmonie/common';

export const authorize = (req: HttpRequest) => {
  const { functionPrivateKey, functionSecret, functionSecretExpirationTimeInMs } = process.env;

  if (!functionPrivateKey) {
    return;
  }

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new Error(`Missing header 'Authorization'`);
  }

  const decryptedData = Crypto.privateDecrypt(functionPrivateKey, authorizationHeader);
  const index = decryptedData.indexOf('_');
  if (index === -1) {
    throw new Error('Authorization header value is not in the correct format');
  }

  const [dateTime, secret] = decryptedData.split('_');
  if (!Number(dateTime)) {
    throw new Error('Authorization header value is not in the correct format');
  }

  if (secret !== functionSecret) {
    throw new Error('Authorization header value is not in the correct format');
  }

  const dateTimeNow = new Date().getTime();
  if (dateTime && dateTimeNow - parseInt(dateTime) > parseInt(functionSecretExpirationTimeInMs)) {
    throw new Error('Authorization token has expired');
  }
};
