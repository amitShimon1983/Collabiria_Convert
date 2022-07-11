import { GraphRestClient } from '@harmonie/server-shared';
import config from '../config';

const { azureClientScope, azureClientSecret, azureClientId } = config;

const graphRestClient = new GraphRestClient(azureClientId, azureClientSecret, azureClientScope);

export default graphRestClient;
