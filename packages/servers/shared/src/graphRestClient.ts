import path from 'path';
import { HeadersInit } from 'node-fetch';
import RestClient from './restClient';

class GraphRestClient {
  private readonly _baseUrl: string;
  private readonly _token: string;

  constructor(token: string, baseUrl?: string) {
    this._baseUrl = baseUrl || 'https://graph.microsoft.com/';
    this._token = token;
  }

  private createUrl(urlPath: string): string {
    return new URL(urlPath, this._baseUrl).href;
  }

  private getHeaders(): HeadersInit {
    return { Authorization: `Bearer ${this._token}` };
  }

  public async apiGet(urlPath: string) {
    const url = this.createUrl(urlPath);
    const extraHeaders = this.getHeaders();
    const { data } = await RestClient.getJson(url, extraHeaders);
    return data;
  }

  async fetchFile(urlPath: string) {
    const url = this.createUrl(urlPath);
    const extraHeaders = this.getHeaders();
    return await RestClient.file(url, extraHeaders);
  }

  async getPhoto(upn: string) {
    const urlPath = `v1.0/users/${upn}/photos/48x48/$value`;
    const { data } = await this.fetchFile(urlPath);
    return data ? `data:image/png;base64,${Buffer.from(data).toString('base64')}` : null;
  }

  async getPeopleImageBlob(urlPath: string) {
    const url = this.createUrl(urlPath);
    const extraHeaders = this.getHeaders();
    return await RestClient.blob(url, extraHeaders);
  }
}

export default GraphRestClient;
