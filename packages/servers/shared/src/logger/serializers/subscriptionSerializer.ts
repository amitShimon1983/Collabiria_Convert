import { pick } from '../utils';

const subscriptionSerializer = (subscription: any) => {
  return pick(subscription, [
    'isDeleted',
    'ownerId',
    'expirationDateTime',
    'subscriptionId',
    'resource',
    'notificationUrl',
    'mailboxId',
    'changeType',
  ]);
};

export default subscriptionSerializer;
