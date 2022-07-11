import { Writable } from 'stream';
import { setup, defaultClient } from 'applicationinsights';
import { convertLevelToAzureSeverity } from '../utils';

class AzureStream extends Writable {
  private readonly connectionString: string | undefined;

  constructor(connectionString: string | undefined) {
    super({ objectMode: true });

    this.connectionString = connectionString;

    if (!this.connectionString) {
      return;
    }
    setup(this.connectionString).start();
  }

  _write(entry: any, _encoding: string, done: () => void) {
    if (!this.connectionString) {
      return;
    }

    const { level, err = {}, msg, ...properties } = entry;
    const props = { ...(properties || {}), ...err };

    defaultClient.trackTrace({
      severity: convertLevelToAzureSeverity(level),
      message: msg || err?.message,
      properties: props,
      contextObjects: props,
    });

    defaultClient.flush();
    done();
  }
}

export default AzureStream;
