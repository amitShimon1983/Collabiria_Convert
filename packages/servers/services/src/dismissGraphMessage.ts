import { GraphClient } from '@harmonie/server-shared';

export const EXTENDED_MAIL_ID = 'String {ddfc984d-b826-40d7-b48b-57002df800e5} Name DismissEmail';

export async function dismissEmail({
  from,
  id,
  boardIds,
  client,
}: {
  from?: string;
  id: string;
  boardIds: string[];
  client: GraphClient;
}) {
  const message = await getMessageSingleValueExtendedProperties(from || '', id, client);
  const singleValueExtendedProperty: any = message?.singleValueExtendedProperties?.find(
    (singleValueExtendedProperty: any) => singleValueExtendedProperty.id === EXTENDED_MAIL_ID
  );
  const valueSingleValueExtended = singleValueExtendedProperty?.value ? singleValueExtendedProperty?.value : '';
  const update = {
    singleValueExtendedProperties: [
      ...(message?.singleValueExtendedProperties?.filter(({ id }: { id: string }) => id !== EXTENDED_MAIL_ID) || []),
      {
        id: EXTENDED_MAIL_ID,
        value: `${valueSingleValueExtended}, ${boardIds?.join(' , ')}`,
      },
    ],
  };
  await updateEmail({ from, message: update, id: id, client });
}

async function getMessageSingleValueExtendedProperties(mailboxId: string, emailId: string, client: GraphClient) {
  const expandVal = `singleValueExtendedProperties($filter=id eq '${EXTENDED_MAIL_ID}')`;
  const selectVal = 'conversationId';
  const baseUrl = `users/${mailboxId}/messages/${emailId}`;
  const message = await client.executeCall({
    url: baseUrl,
    header: { key: 'Prefer', value: "outlook.body-content-type='text'" },
    expandVal,
    pagging: 1,
    selectVal: selectVal,
  });
  return message;
}

async function updateEmail({
  from,
  message,
  id,
  client,
}: {
  from?: string;
  message: any;
  id: string;
  client: GraphClient;
}) {
  try {
    return await client.updateMessage({ from: from, message: message, id: id });
  } catch (error) {
    console.log(`[updateEmail] id ${id} mailBox ${from} message id${message.id}  ${JSON.stringify(error)}`);
    throw error;
  }
}
