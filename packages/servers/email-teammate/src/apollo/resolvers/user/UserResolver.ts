import { Arg, Query, Resolver } from 'type-graphql';
import { User } from '@harmonie/server-db';
import { userService } from '../../../services';
import { getUserInput } from './types';

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getUser(@Arg('args') args: getUserInput) {
    const { userObjectId } = args;
    return await userService.getUser(userObjectId);
  }
}
