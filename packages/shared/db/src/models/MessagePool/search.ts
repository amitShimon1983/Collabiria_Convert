import { IMessagePoolModel } from './types';

const calculateDate = (weeksBefore: number): Date => {
  const endRange = new Date();
  endRange.setDate(endRange.getDate() - weeksBefore * 7);
  return new Date(endRange.toISOString());
};
export enum ParentFolder {
  Inbox = 'inbox',
  SentItems = 'sentitems',
}
export const search = async function (
  this: IMessagePoolModel,
  taskBoard: string,
  searchTerms: any = {},
  weeksBefore?: number,
  endCursor?: string,
  parentFolder: string = ParentFolder.Inbox
) {
  const { from, to, subject, freeText } = searchTerms;

  const baseQuery = {
    taskBoard,
    parentFolder,
    dismissed: false,
    ...(weeksBefore && { receivedDateTime: { $gt: calculateDate(weeksBefore) } }),
  };

  const termsQuery = {
    ...baseQuery,
    ...(subject && { subject: { $regex: subject, $options: 'i' } }),
    ...(from && {
      $or: [
        { 'from.emailAddress.address': { $regex: from, $options: 'i' } },
        { 'from.emailAddress.name': { $regex: from, $options: 'i' } },
      ],
    }),
    ...(to && {
      $or: [
        { 'toRecipients.emailAddress.address': { $regex: to, $options: 'i' } },
        { 'toRecipients.emailAddress.name': { $regex: to, $options: 'i' } },
      ],
    }),
  };

  const freeTextQuery = {
    ...baseQuery,
    $or: [
      { subject: { $regex: freeText, $options: 'i' } },
      { 'body.content': { $regex: freeText, $options: 'i' } },
      { 'from.emailAddress.address': { $regex: freeText, $options: 'i' } },
      { 'from.emailAddress.name': { $regex: freeText, $options: 'i' } },
      { 'toRecipients.emailAddress.address': { $regex: freeText, $options: 'i' } },
      { 'toRecipients.emailAddress.name': { $regex: freeText, $options: 'i' } },
    ],
  };

  const query = freeText ? freeTextQuery : termsQuery;

  const limit = 25;
  const skip = endCursor ? Number(endCursor) : 0;
  const countPromise = this.count(query).exec();
  const docsPromise = this.find(query).sort({ receivedDateTime: 'desc' }).skip(skip).limit(limit).lean();

  return Promise.all([countPromise, docsPromise]).then(values => {
    const [total, results] = values;

    const page = Math.ceil((skip + 1) / limit);
    const pages = limit > 0 ? Math.ceil(total / limit) || 1 : 0;

    const pageInfo = {
      endCursor: limit * page,
      hasNextPage: page < pages,
    };
    const messages = results.map(res => ({ ...res, _id: res.messageId }));
    return {
      pageInfo,
      results: messages,
    };
  });
};
