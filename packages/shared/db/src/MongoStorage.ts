import mongoose, { Connection } from 'mongoose';
import init from './init';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MongoStorage {
  private readonly _url: string;
  public _client: Connection | undefined;

  constructor(dbUrl: string) {
    this._url = dbUrl;
  }

  private async connect() {
    await mongoose.connect(this._url);
    this._client = mongoose.connection;
  }

  public async init() {
    try {
      await this.connect();
      await init(this._client);
      return this;
    } catch (error) {
      await delay(3000);
      return this.connect();
    }
  }
}

export default MongoStorage;
