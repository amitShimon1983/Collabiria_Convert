import { URLSearchParams } from 'url';
import fetch, { Blob, HeadersInit, RequestInit, Response } from 'node-fetch';

const getResponseJson = async (response: Response): Promise<any | null> => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export default class RestClient {
  static async get(
    endpoint: string,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<Response> {
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    const options: RequestInit = {
      method: 'GET',
      headers,
      ...extraOptions,
    };
    return await fetch(endpoint, options);
  }

  static async getJson(
    endpoint: string,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<{ data: any; response: Response }> {
    const response: Response = await this.get(endpoint, extraHeaders, extraOptions);
    const data = await getResponseJson(response);
    return { data, response };
  }

  static async post(
    endpoint: string,
    body: BodyInit,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<Response> {
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    const options: RequestInit = {
      method: 'POST',
      headers,
      ...extraOptions,
      body: JSON.stringify(body),
    };
    return await fetch(endpoint, options);
  }

  static async postJson(
    endpoint: string,
    body: BodyInit,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<{ data: any; response: Response }> {
    const response: Response = await this.post(endpoint, body, extraHeaders, extraOptions);
    const data = await getResponseJson(response);
    return { data, response };
  }

  static async formUrl(
    endpoint: string,
    body: any,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<{ data: any; response: Response }> {
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...extraHeaders,
    };
    const options: RequestInit = {
      method: 'POST',
      headers,
      ...extraOptions,
      body: new URLSearchParams(body).toString(),
    };
    const response: Response = await fetch(endpoint, options);
    const data = await getResponseJson(response);
    return { data, response };
  }

  static async file(
    endpoint: string,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<{ data: ArrayBuffer; response: Response }> {
    const response: Response = await this.get(endpoint, extraHeaders, extraOptions);
    const data: ArrayBuffer = await response.arrayBuffer();
    return { data, response };
  }

  static async blob(
    endpoint: string,
    extraHeaders: HeadersInit = {},
    extraOptions: RequestInit = {}
  ): Promise<{ data: Blob; response: Response }> {
    const response: Response = await this.get(endpoint, extraHeaders, extraOptions);
    const data: Blob = await response.blob();
    return { data, response };
  }

  static async postFetch(endpoint: string, data: any) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      return (await response.json()) as any;
    }
    const text = (await response.text()) as any;
    throw new Error(text || response.statusText);
  }
}
