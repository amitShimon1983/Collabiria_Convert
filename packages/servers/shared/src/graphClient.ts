import axios from 'axios';
import { Client } from '@microsoft/microsoft-graph-client';
import { Message } from '@microsoft/microsoft-graph-types';

const EXTENDED_SENT_MAIL_ID = 'String {ddfc984d-b826-40d7-b48b-57002df800e6} Name SentEmail';

class GraphClient {
  private readonly _token: string;
  public graphClient: Client;

  constructor(token: string) {
    this._token = token;
    this.graphClient = Client.init({
      authProvider: done => {
        done(null, this._token);
      },
    });
  }

  async getEmailAttachments(itemId: string, emailAddress?: string) {
    const baseUrl = !emailAddress
      ? `/me/messages/${itemId}/attachments`
      : `/users/${emailAddress}/messages/${itemId}/attachments`;
    return await this.graphClient.api(baseUrl).get();
  }

  async getPhoto(email?: string) {
    const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${email}/photos/48x48/$value`;
    const file = await this.fetchFile(graphEndpoint);
    return file ? `data:image/png;base64,${Buffer.from(file).toString('base64')}` : null;
  }
  async getEmailData(itemId: string, from?: string, headers?: { [key: string]: string }) {
    const baseUrl = !from ? `/me/messages/${itemId}` : `/users/${from}/messages/${itemId}`;

    const baseQuery = this.graphClient
      .api(baseUrl)
      .expand(`attachments($select=id,name,size,contentType,isInline,microsoft.graph.fileAttachment/contentId)`);
    const fullQuery = headers ? baseQuery.headers(headers) : baseQuery;

    return await fullQuery.get();
  }
  async fetch(graphEndpoint: string) {
    try {
      const response = await axios(graphEndpoint);
      // eslint-disable-next-line no-console
      // console.log('response', response);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async fetchFile(graphEndpoint: string) {
    try {
      const response = await axios(graphEndpoint, {
        headers: { Authorization: `Bearer ${this._token}` },
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }

  // async getPhoto(email?: string) {
  //   const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${email}/photos/48x48/$value`;
  //   const blob = await this.getPeopleImageBlob(graphEndpoint);
  //   if (blob.type === 'application/json') {
  //     return null;
  //   }
  //   return await this.blobToBase(blob);
  // }

  async getPeopleImageBlob(url: string) {
    let response = await fetch(url, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
    return await response.blob();
  }

  // private async blobToBase(blob: Blob) {
  //   let buffer = Buffer.from(await blob.text());
  //   return 'data:' + blob.type + ';base64,' + buffer.toString('base64');
  // }

  public async getMe() {
    return await this.graphClient.api('/me').get();
  }

  async getFolders(mailbox: string) {
    try {
      const baseUrl = `/users/${mailbox}/mailFolders`;
      const folders = await this.graphClient.api(baseUrl).version('v1.0').top(200).get();
      return folders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async executeCall({
    url,
    expandVal,
    selectVal,
    pagging,
    filterVal,
    searchTerm,
    orderByProperty,
    orderByOrder,
    header,
  }: {
    url: string;
    expandVal?: string;
    pagging: number;
    filterVal?: string | null;
    searchTerm?: string | null;
    selectVal: string;
    orderByProperty?: string | null;
    orderByOrder?: string | null;
    header?: { [key: string]: any } | null;
  }) {
    try {
      let executableQuery = this.graphClient.api(url).select(selectVal);
      if (header) {
        executableQuery.header(header.key, header.value);
      }
      if (expandVal) {
        executableQuery = executableQuery.expand(expandVal);
      }
      executableQuery.top(pagging);
      if (searchTerm) {
        const search = `"${searchTerm.replace(/\\/g, '').replace(/"/g, '\\"')}"`;
        executableQuery = executableQuery.search(encodeURIComponent(search));
      }
      if (filterVal && !searchTerm) {
        executableQuery = executableQuery.filter(filterVal);
      }
      if (orderByProperty && orderByOrder && !searchTerm) {
        executableQuery.orderby(`${orderByProperty} ${orderByOrder}`);
      }
      return await executableQuery.get();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  // subscriptions
  async getSubscription(id: string) {
    return await this.graphClient.api(`/subscriptions/${id}`).get();
  }

  public async createSubscribe(subscription: any) {
    return await this.graphClient.api('/subscriptions').post(subscription);
  }

  public async getAllSubscriptions() {
    return await this.graphClient.api('/subscriptions').get();
  }
  public async getSubscriptionById(id: string) {
    return await this.graphClient.api(`/subscriptions/${id}`).get();
  }

  public async updateSubscription(id: string, subscription: any) {
    return await this.graphClient.api(`/subscriptions/${id}`).update(subscription);
  }

  async getAttachmentContentBytes(messageId: string, attachmentId: string, mailBox: string) {
    const graphEndpoint = `/users/${mailBox}/messages/${messageId}/attachments/${attachmentId}`;
    const { contentBytes } = await this.graphClient.api(graphEndpoint).get();
    if (contentBytes) {
      const buffer = Buffer.from(contentBytes, 'base64');
      return buffer;
    }
    return Buffer.alloc(6);
  }

  public async deleteSubscription(id: string) {
    return await this.graphClient.api(`/subscriptions/${id}`).delete();
  }
  async updateMessage({
    from,
    message,
    id,
    headers,
  }: {
    from?: string;
    message: any;
    id: string;
    headers?: { [key: string]: string };
  }) {
    const baseUrl = !from ? `/me/messages/${id}` : `/users/${from}/messages/${id}`;
    const baseQuery = this.graphClient.api(baseUrl);
    try {
      return await (headers ? baseQuery.headers(headers).update(message) : baseQuery.update(message));
    } catch (err: any) {
      throw { ...err, message: `Error updating message: ${err.message}` };
    }
  }
  // users
  public async getMailMessage(mailboxId: string, resourceId: string): Promise<Message> {
    const path = `users/${mailboxId}/messages/${resourceId}`;
    const properties = [
      'sentDateTime',
      'receivedDateTime',
      'subject',
      'categories',
      'from',
      'body',
      'toRecipients',
      'sender',
      'bodyPreview',
      'isRead',
      'webLink',
      'inferenceClassification',
      'lastModifiedDateTime',
      'conversationId',
      'isDraft',
      'parentFolderId',
      'ccRecipients',
      'bccRecipients',
      'replyTo',
      'importance',
      'internetMessageId',
      'conversationIndex',
      'createdDateTime',
      'hasAttachments',
    ];
    const expand = `attachments($select=id,microsoft.graph.fileAttachment/contentId,name,size,contentType,isInline),singleValueExtendedProperties($filter=id eq '${EXTENDED_SENT_MAIL_ID}')`;
    const executableQuery = this.graphClient
      .api(path)
      .select(properties)
      .header('Prefer', 'IdType="ImmutableId"')
      .expand(expand);
    return await executableQuery.get();
  }

  public async isOwner(mailboxId: string): Promise<Message> {
    const path = `users/${mailboxId}/messages/$count`;
    const executableQuery = this.graphClient.api(path);
    return await executableQuery.get();
  }
}

export default GraphClient;
