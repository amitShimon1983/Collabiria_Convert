import { Message } from '@harmonie/server-db';
import { GraphClient, GraphRestClient, logger } from '@harmonie/server-shared';

import { GetMailsArgs } from 'src/apollo/resolvers/message/types';
export const EXTENDED_MAIL_ID = 'String {ddfc984d-b826-40d7-b48b-57002df800e5} Name DismissEmail';
const log = logger.createLogger({});

export async function getEmailDataById(token: string, itemId: string, from: any) {
  const client = new GraphClient(token);
  const message = await client.getEmailData(itemId, from);
  if (message) {
    return Message.fromGraphMessage(message);
  }
  return null;
}
const isDismissedFilter = ({ id, value }: { id: string; value: string }) => {
  const isFiltered =
    (id === 'String {ddfc984d-b826-40d7-b48b-57002df800e5} Name DesmissEmail' && value === 'ignor') ||
    (value?.includes('taskboardId') && id === EXTENDED_MAIL_ID);
  return isFiltered;
};
const getAllMails = async ({
  token,
  user,
  filterQuery,
  endCursor,
  orderByOrder,
  orderByProperty,
  top,
  searchTerm,
  scope,
  header,
}: {
  token: string;
  user: any;
  filterQuery?: string;
  endCursor?: string;
  top?: number;
  orderByProperty?: string;
  orderByOrder?: 'asc' | 'desc';
  searchTerm?: string | null;
  scope?: string | null;
  header?: { [key: string]: any };
  withInline?: boolean;
  withTopResults?: boolean;
}) => {
  const expandVal = `attachments($select=id,name,size,contentType,isInline,microsoft.graph.fileAttachment/contentId)`;

  let mailResults: any[] = [];
  let results;
  let innerEndCursor = endCursor;
  let keepSearch = true;
  const graphClient = new GraphClient(token);
  const graphRestClient = new GraphRestClient(token);
  try {
    while (keepSearch) {
      results = innerEndCursor
        ? await graphRestClient.apiGet(innerEndCursor)
        : await graphClient.getGraphMessages({
            filterQuery,
            emailAddress: user.upn,
            orderByOrder,
            top,
            orderByProperty,
            searchTerm,
            scope,
            header,
            expandVal,
          });
      ({ mailResults, keepSearch, innerEndCursor } = filterDismissedMessages(
        results,
        mailResults,
        keepSearch,
        top,
        innerEndCursor
      ));
    }
    results.value = mailResults;
    return {
      isAuthorized: true,
      results: results?.value?.map((message: any) => Message.fromGraphMessage(message, false)),
      pageInfo: {
        hasNextPage: !!results['@odata.nextLink'],
        endCursor: !!results['@odata.nextLink']
          ? getPathAndQuery(results['@odata.nextLink'])
          : results['@odata.nextLink'],
      },
    };
  } catch (error) {
    throw error;
  }
};
function filterDismissedMessages(
  results: any,

  mailResults: any[],
  keepSearch: boolean,
  top: number | undefined,
  innerEndCursor: string | undefined
) {
  if (results?.value) {
    results.value = results?.value?.filter(
      (mail: any) => !mail?.singleValueExtendedProperties?.find(isDismissedFilter)
    );
    mailResults = [...mailResults, ...results.value];

    keepSearch = mailResults.length < (top || 20) && !!results['@odata.nextLink'];
    if (keepSearch) {
      innerEndCursor = !!results['@data.nextLink']
        ? getPathAndQuery(results['@odata.nextLink'])
        : results['@odata.nextLink'];
    }
  }
  return { mailResults, keepSearch, innerEndCursor };
}
export async function getFolders({ token, emailAddress }: { token: string; emailAddress: string }) {
  const client = new GraphClient(token);
  const response = await client.getFolders(emailAddress);
  return response.value;
}

export async function getMails({ token, user, args }: { token: string; user: any; args: GetMailsArgs }) {
  const result = await getMailsForFolder({
    token,
    user,
    args,
    withTopResults: !!args?.searchTerm || false,
    withInline: false,
  });
  return result;
}

export async function getEmailAttachments({
  itemId,
  token,
  emailAddress,
}: {
  itemId: string;
  token: string;
  emailAddress: string;
}) {
  let attachments;
  try {
    const client = new GraphClient(token);
    const data = await client.getEmailAttachments(itemId, emailAddress);
    attachments = data?.value;
  } catch (error: any) {
    log.error(`getEmailAttachments error: ${error.message}`);
    return;
  }

  if (attachments?.length) {
    const arr: any[] = [];
    attachments.forEach((element: any) => {
      if (element.isInline) {
        arr.push({
          contentType: element.contentType,
          contentBytes: element.contentBytes,
          contentId: element.contentId,
        });
      }
    });
    return arr;
  }
}

async function getMailsForFolder({
  token,
  user,
  args,
  withTopResults,
  withInline = true,
}: {
  token: string;
  user: any;
  args: GetMailsArgs;
  withTopResults?: boolean;
  withInline?: boolean;
}) {
  const today = new Date();
  const endRange = new Date();
  const { onlyRead, scope, endCursor, searchTerm } = args;
  endRange.setDate(endRange.getDate() - 4 * 7);
  const filterQuery: any = `${
    `(receivedDateTime ge ${endRange.toISOString()} and receivedDateTime le ${today.toISOString()}) and inferenceClassification eq 'focused'` +
    `${onlyRead ? ' and isRead eq true ' : ''}` +
    ` and (singleValueExtendedProperties/Any(ep: ep/id eq 'String {ddfc984d-b826-40d7-b48b-57002df800e5} Name DesmissEmail' and ep/value ne 'ignor'))`
  }`;

  const results = await getAllMails({
    scope,
    user,
    searchTerm,
    filterQuery,
    token,
    top: 20,
    endCursor,
    orderByProperty: 'receivedDateTime',
    orderByOrder: 'desc',
    header: { key: 'Prefer', value: "outlook.body-content-type='html'" },
    withInline: withInline,
    withTopResults,
  });

  return results;
}

function getPathAndQuery(inputUrl: string) {
  const tempURL = new URL(inputUrl);
  const resultURL = tempURL.pathname + tempURL.search;
  return resultURL;
}
