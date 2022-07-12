import { MicrosoftOAuth } from '@harmonie/server-shared';
import config from '../config';

const { azureClientScope, azureClientSecret, azureClientId } = config;

const microsoftOAuth = new MicrosoftOAuth(azureClientId, azureClientSecret, azureClientScope);

export default microsoftOAuth;
