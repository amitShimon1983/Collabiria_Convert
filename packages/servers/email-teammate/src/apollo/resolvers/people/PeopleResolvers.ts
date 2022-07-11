import { Arg, Ctx, Resolver, Query } from 'type-graphql';
import { peopleService } from '../../../services';
import { FindPeopleArgs, GetProfilePictureArgs, MailPerson, ProfilePicture } from './types';

@Resolver()
export default class PeopleResolver {
  @Query(() => ProfilePicture, { nullable: true })
  async getProfilePicture(@Arg('args', () => GetProfilePictureArgs) args: GetProfilePictureArgs, @Ctx() context: any) {
    const { token } = context;
    const { principalName } = args;
    const result = await peopleService.getMailPersonPhoto({ token, principalName });
    return {
      base64ByteArray: result ?? '',
      principalName,
    };
  }
  @Query(() => [MailPerson])
  async findPeople(@Arg('args', () => FindPeopleArgs) args: FindPeopleArgs, @Ctx() context: any) {
    const { token, user } = context;
    const { text } = args;
    return await peopleService.findPeople({ token, text, emailAddress: user.upn });
  }
}
