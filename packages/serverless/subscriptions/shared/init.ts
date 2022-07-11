import { AzureKeyVault } from '@harmonie/common';
import { initAzureBlobStorage } from './blobStorage';
import { initDb } from './db';
import { initAzureKeyVault } from './keyVault';

const init = async () => {
  await initDb();
  await initAzureKeyVault();
  const functionAppPrivateKey = await AzureKeyVault.getSecretValue('FunctionAppPrivateKey');
  const functionAppPublicKey = await AzureKeyVault.getSecretValue('FunctionAppPublicKey');
  const functionSecret = await AzureKeyVault.getSecretValue('FunctionAppSecret');
  const connectionString = await AzureKeyVault.getSecretValue('BlobConnectionString');
  await initAzureBlobStorage({ connectionString });
  process.env.functionAppPublicKey = functionAppPublicKey;
  process.env.functionAppPrivateKey = functionAppPrivateKey;
  process.env.functionSecret = functionSecret;
};

export { init };
