import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { TeamMember } from '@harmonie/server-db';
import { teamMemberService } from '../../../services';
import { addUserToTeamInput, getTeamMembersInput, removeUserFromTeamInput, TeamMemberOutput } from './types';

@Resolver()
export default class TeamMemberResolver {
  @Query(() => [TeamMemberOutput])
  async getTeamMembers(@Arg('args') args: getTeamMembersInput) {
    const { teamObjectId, role } = args;
    return await teamMemberService.getTeamMembers(teamObjectId, role);
  }

  @Mutation(() => TeamMember)
  async addMemberToTeam(@Arg('args') args: addUserToTeamInput) {
    const { teamObjectId, userObjectId } = args;
    return await teamMemberService.addMemberToTeam(teamObjectId, userObjectId);
  }

  @Mutation(() => TeamMember)
  async removeMemberFromTeam(@Arg('args') args: removeUserFromTeamInput) {
    const { teamObjectId, userObjectId } = args;
    return await teamMemberService.removeMemberFromTeam(teamObjectId, userObjectId);
  }
}
