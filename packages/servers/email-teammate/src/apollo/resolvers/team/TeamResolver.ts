import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { Team } from '@harmonie/server-db';
import { teamService } from '../../../services';
import {
  getOrganizationTeamsInput,
  getTeamInput,
  updateTeamInput,
  createTeamInput,
  getOrganizationsTeamsInput,
} from './types';

@Resolver()
export default class TeamResolver {
  @Query(() => Team)
  async getTeam(@Arg('args') args: getTeamInput) {
    const { teamObjectId } = args;
    return await teamService.getTeam(teamObjectId);
  }

  @Mutation(() => Team)
  async createTeam(@Arg('args') args: createTeamInput) {
    const { teamName, organizationObjectId, userObjectId } = args;
    return await teamService.createTeam(userObjectId, {
      organization: organizationObjectId,
      name: teamName,
    });
  }

  @Mutation(() => Team)
  async updateTeam(@Arg('args') args: updateTeamInput) {
    const { teamObjectId, organizationObjectId, teamName } = args;
    return await teamService.updateTeam(teamObjectId, { organization: organizationObjectId, name: teamName });
  }

  @Query(() => [Team])
  async getOrganizationTeams(@Arg('args') args: getOrganizationTeamsInput) {
    const { organizationObjectId } = args;
    return await teamService.getOrganizationTeams(organizationObjectId);
  }

  @Query(() => [Team])
  async getOrganizationsTeams(@Arg('args') args: getOrganizationsTeamsInput) {
    const { organizationObjectIds } = args;
    return await teamService.getOrganizationsTeams(organizationObjectIds);
  }
}
