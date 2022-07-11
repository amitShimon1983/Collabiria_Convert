import { AzureBlobStorage, logger } from '@harmonie/server-shared';
const log = logger.createLogger();

export const initBlobStorage = (blobConnectionString: string) => {
  if (!blobConnectionString) {
    log.warn('blobConnectionString is empty');
    return;
  }

  AzureBlobStorage.init(blobConnectionString);
};
