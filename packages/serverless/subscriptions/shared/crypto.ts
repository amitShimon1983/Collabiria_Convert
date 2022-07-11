import { Crypto } from '@harmonie/common';

const { cryptoAlgorithm, cryptoSecret, cryptoIV } = process.env;

if (!cryptoAlgorithm || !cryptoSecret || !cryptoIV) {
  console.error(new Error('[subscriptions] crypto is not configured, check function app configuration.'));
}

const crypto = new Crypto(cryptoAlgorithm, cryptoSecret, cryptoIV);

export { crypto };
