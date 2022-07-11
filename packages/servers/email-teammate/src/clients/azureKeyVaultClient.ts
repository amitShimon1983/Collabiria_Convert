import { AzureKeyVault, logger } from '@harmonie/server-shared';

const log = logger.createLogger();

export const initKeyVault = (vaultConnectionString: string) => {
  if (!vaultConnectionString) {
    log.warn('vaultConnectionString is empty');
    return;
  }

  AzureKeyVault.init(vaultConnectionString);
  log.info('KeyVault is running');
};
