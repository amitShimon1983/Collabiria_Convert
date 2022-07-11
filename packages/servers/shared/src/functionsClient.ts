import fetch from 'node-fetch';
import Crypto from './crypto';

class FunctionsClient {
  private readonly _publicKey?: string;
  private readonly _secret?: string;

  constructor(publicKey?: string, secret?: string) {
    this._publicKey = publicKey;
    this._secret = secret;
  }

  private getAuthorization() {
    try {
      if (this._publicKey) {
        const secretData = `${new Date().getTime()}_${this._secret}`;
        return {
          authorization: Crypto.publicEncrypt(this._publicKey, secretData),
        };
      }
      return {};
    } catch (e) {
      throw new Error(`Cannot create authorization header, Error: ${e.message}`);
    }
  }

  public async apiPost(functionEndpoint: string, data: any) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...this.getAuthorization(),
      },
      body: JSON.stringify(data),
    } as any;
    const response = await fetch(functionEndpoint, options);
    if (response.status === 200) {
      return (await response.json()) as any;
    }
    const text = (await response.text()) as any;
    throw new Error(text || response.statusText);
  }
}

export default FunctionsClient;
