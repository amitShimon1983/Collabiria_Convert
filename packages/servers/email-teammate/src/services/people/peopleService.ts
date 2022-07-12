import 'isomorphic-fetch';
import { GraphRestClient, logger } from '@harmonie/server-shared';
import { map, get, compact } from 'lodash';
import fetch from 'node-fetch';

class PeopleService {
  static instance: PeopleService;
  _logger: { [key: string]: any };
  constructor() {
    this._logger = logger.createLogger();
  }
  static getInstance() {
    if (!PeopleService.instance) {
      PeopleService.instance = new PeopleService();
    }
    return PeopleService.instance;
  }

  async searchPeople(token: string, text?: string, fields?: Array<string>, emailAddress?: string) {
    try {
      const searchParam = text ? `&$search="${text}"` : '';
      const selectParam = fields ? `&$select=${fields.join(',')}` : '';
      const urlSegment = !emailAddress ? 'me' : `users/${emailAddress}`;
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/${urlSegment}/people/?$top=3${searchParam}${selectParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );
      const data = await response.json();
      return data?.value;
    } catch (err: any) {
      return [];
    }
  }
  async getMailPersonPhoto({ token, principalName }: { token: string; principalName?: string }) {
    this._logger.info({ principalName }, 'peopleService.getMailPersonPhoto called');
    try {
      const client = new GraphRestClient(token);
      const photo = principalName ? await client.getPhoto(principalName) : '';
      if (!photo) {
        this._logger.warn({ principalName }, 'peopleService.getMailPersonPhoto returned empty');
      }
      return photo;
    } catch (error: any) {
      this._logger.error(`peopleService.getMailPersonPhoto error: ${error.message}`);
      return null;
    }
  }

  async findPeople({ token, text, emailAddress }: { token: string; text?: string; emailAddress?: string }) {
    this._logger.info({ text }, 'peopleService.findPeople called');
    const people = await this.searchPeople(token, text, ['displayName', 'scoredEmailAddresses'], emailAddress);
    const mailPersons = map(people, p => ({
      name: p.displayName,
      address: get(p, 'scoredEmailAddresses.0.address'),
    }));
    this._logger.info({ text, result: mailPersons.length }, 'peopleService.findPeople finished');
    return mailPersons;
  }
  async getUsersPictures(senderUpn: string, ownerUpn: string, token: string) {
    return await Promise.all(
      compact([senderUpn, ownerUpn]).map(principalName =>
        this.getMailPersonPhoto({
          token,
          principalName,
        })
      )
    );
  }
}

export default PeopleService.getInstance();
