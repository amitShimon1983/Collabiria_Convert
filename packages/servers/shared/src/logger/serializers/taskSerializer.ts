import { pick } from '../utils';

const taskSerializer = (task: any) => {
  return pick(task, [
    '_id',
    'title',
    'messageId',
    'issuer',
    'status',
    'owner',
    'assigneeDate',
    'createdBy',
    'isDeleted',
    'created',
    'emailInfo',
  ]);
};

export default taskSerializer;
