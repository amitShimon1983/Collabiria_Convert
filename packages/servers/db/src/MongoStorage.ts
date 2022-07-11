import mongoose, { Connection } from 'mongoose';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MongoStorage {
  private readonly _url: string;
  public _client: Connection | undefined;

  constructor(dbUrl: string) {
    this._url = dbUrl;
  }

  public async connect(): Promise<Connection> {
    try {
      await mongoose.connect(this._url);
      this._client = mongoose.connection;
      return this._client;
    } catch (error) {
      await delay(3000);
      return this.connect();
    }
  }
}

export default MongoStorage;
