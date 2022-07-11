import { default as reqSerializer } from './reqSerializer';
import { default as subscriptionSerializer } from './subscriptionSerializer';
import { default as messageSerializer } from './messageSerializer';
import { default as notificationSerializer } from './notificationSerializer';
import { default as messagePoolSerializer } from './messagePoolSerializer';
import { default as userSerializer } from './userSerializer';
import { default as argsSerializer } from './argsSerializer';
import { default as taskSerializer } from './taskSerializer';

export default {
  req: reqSerializer,
  subscription: subscriptionSerializer,
  message: messageSerializer,
  notification: notificationSerializer,
  messagePool: messagePoolSerializer,
  user: userSerializer,
  args: argsSerializer,
  task: taskSerializer,
};
