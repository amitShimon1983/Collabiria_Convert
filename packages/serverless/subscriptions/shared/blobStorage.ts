import { AzureBlobStorage } from '@harmonie/common';

export const initAzureBlobStorage = async ({ connectionString }: { connectionString: string }) => {
  try {
    if (!connectionString) {
      console.error(new Error('[subscriptions] vaultUrl is not configured, check function app configuration.'));
      return;
    }
    AzureBlobStorage.init(connectionString);
    console.log('[subscriptions] AzureBlobStorage connected');
  } catch (e) {
    console.error(e);
  }
};
