import { Request } from 'express';
import { pick } from '../utils';

const reqSerializer = (req: Request & { requestId: string }) => {
  const obj = {
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    taskBoardId: req.get('taskBoardId'),
    userId: req.get('userId'),
  };
  return pick(obj);
};

export default reqSerializer;
