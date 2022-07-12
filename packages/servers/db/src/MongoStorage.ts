import mongoose, { Connection } from 'mongoose';
import { logger } from '@harmonie/server-shared';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const log = logger.createLogger();
class MongoStorage {
  private readonly _url: string;
  public _client: Connection | undefined;

  constructor(dbUrl: string) {
    this._url = dbUrl;
  }

  public async connect(): Promise<Connection> {
    try {
      log.info({ url: this._url }, 'Connecting to database...');
      await mongoose.connect(this._url);
      this._client = mongoose.connection;
      return this._client;
    } catch (error) {
      log.error(error);
      await delay(3000);
      return this.connect();
    }
  }
}

export default MongoStorage;
