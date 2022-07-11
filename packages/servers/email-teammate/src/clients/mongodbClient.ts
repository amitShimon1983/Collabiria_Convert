import { MongoStorage } from '@harmonie/server-db';
import { logger } from '@harmonie/server-shared';

const log = logger.createLogger();

export const initMongodb = async (dbConnectionString: string) => {
  if (!dbConnectionString) {
    log.warn('dbConnectionString is empty');
    return;
  }

  const db = new MongoStorage(dbConnectionString);
  const client = await db.connect();
  log.info({ host: client.host, port: client.port, dbName: client.name }, 'Database is running');
  return client;
};
