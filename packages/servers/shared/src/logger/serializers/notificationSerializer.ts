import { pick } from '../utils';

const notificationSerializer = (notification: any) => {
  const resourceData = pick(notification?.resourceData || {}, ['id']);
  const data = pick(notification, ['subscriptionId', 'subscriptionExpirationDateTime', 'changeType', 'resource']);
  return {
    ...data,
    resourceData,
  };
};

export default notificationSerializer;
