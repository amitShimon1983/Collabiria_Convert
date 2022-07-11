import { MongoStorage } from '@harmonie/db';

const { dbUrl } = process.env;

export const initDb = async () => {
  try {
    if (!dbUrl) {
      console.error(new Error('[subscriptions] dbUrl is not configured, check function app configuration.'));
      return;
    }
    const db = await new MongoStorage(dbUrl);
    await db.init();
    console.log('[subscriptions] db connected');
  } catch (e) {
    console.error(e);
  }
};
