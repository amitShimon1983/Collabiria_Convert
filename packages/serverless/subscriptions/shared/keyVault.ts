import { AzureKeyVault } from '@harmonie/common';

const { vaultUrl } = process.env;

export const initAzureKeyVault = async () => {
  try {
    if (!vaultUrl) {
      console.error(new Error('[subscriptions] vaultUrl is not configured, check function app configuration.'));
      return;
    }
    await AzureKeyVault.init(vaultUrl);
    console.log('[subscriptions] AzureKeyVault connected');
  } catch (e) {
    console.error(e);
  }
};
