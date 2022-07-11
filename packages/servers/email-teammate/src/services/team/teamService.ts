import { Types } from 'mongoose';
import { Team, TeamModel, TeamMemberModel, OrganizationModel, UserModel, utils } from '@harmonie/server-db';

export const createTeam = async (userObjectId: string, team: Team) => {
  return await utils.runWithTransaction<Team>(async session => {
    const organization = await OrganizationModel.findById(team.organization);
    if (!organization) {
      throw new Error('organization does not exist');
    }

    const user = await UserModel.findById(userObjectId);
    if (!user) {
      throw new Error('user does not exist');
    }

    const [teamInstance] = await TeamModel.create([{ ...team, organization }], { session });
    await TeamMemberModel.create(
      [
        {
          team: teamInstance,
          user,
          role: 'Owner',
        },
      ],
      { session }
    );

    return teamInstance;
  });
};

export const getTeam = async (teamObjectId: string) => {
  return TeamModel.findById(teamObjectId);
};

export const updateTeam = async (teamObjectId: string, team: Team) => {
  return TeamModel.findOneAndUpdate({ _id: teamObjectId }, team, { new: true });
};

export const getOrganizationTeams = async (organizationObjectId: string) => {
  return TeamModel.find({ organization: new Types.ObjectId(organizationObjectId) });
};
