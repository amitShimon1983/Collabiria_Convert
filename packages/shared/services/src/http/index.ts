export default class RestClient {
  static async get(endpoint: string, extraHeaders: any = {}, extraOptions: any = {}) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    const options = {
      method: 'GET',
      headers,
      ...extraOptions,
    };
    return await this.call(endpoint, options);
  }

  static async post(endpoint: string, data: any, extraHeaders: any = {}, extraOptions: any = {}) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    const options = {
      method: 'POST',
      headers,
      ...extraOptions,
      body: JSON.stringify(data),
    };
    return await this.call(endpoint, options);
  }

  static async formUrl(endpoint: string, data: any, extraHeaders: any = {}, extraOptions: any = {}) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...extraHeaders,
    };
    const options = {
      method: 'POST',
      headers,
      ...extraOptions,
      body: new URLSearchParams(data).toString(),
    };
    return await this.call(endpoint, options);
  }

  static async call(endpoint: string, options: any) {
    const response = await fetch(endpoint, options);
    let data: any;
    try {
      const bodyAsText = await response.text();
      if (bodyAsText) {
        data = JSON.parse(bodyAsText) as any;
      }
    } catch (error: any) {
      throw error;
    }
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
