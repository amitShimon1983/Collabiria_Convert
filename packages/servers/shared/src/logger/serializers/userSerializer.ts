import { pick } from '../utils';

const userSerializer = (user: any) => {
  return pick(user, ['oid', 'name', 'upn', 'tid']);
};

export default userSerializer;
