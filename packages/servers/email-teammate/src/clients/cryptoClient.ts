import { Crypto } from '@harmonie/server-shared';
import config from '../config';

const { cryptoAlgorithm, cryptoIV, cryptoSecret } = config;

const cryptoClient = new Crypto(cryptoAlgorithm, cryptoSecret, cryptoIV);

export default cryptoClient;
