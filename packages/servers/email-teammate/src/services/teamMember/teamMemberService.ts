import { Types } from 'mongoose';
import { TeamMemberModel } from '@harmonie/server-db';
import { validateTeamExist, validateUserExist, isTeamMemberExist } from '../utils';

export const addMemberToTeam = async (teamObjectId: string, userObjectId: string) => {
  const team = await validateTeamExist(teamObjectId);
  const user = await validateUserExist(userObjectId);
  const exist = await isTeamMemberExist(team, user);

  if (exist) {
    throw new Error('user already member of team');
  }

  return await TeamMemberModel.create({
    team,
    user,
    role: 'Member',
  });
};

export const removeMemberFromTeam = async (teamObjectId: string, userObjectId: string) => {
  const team = await validateTeamExist(teamObjectId);
  const user = await validateUserExist(userObjectId);
  const exist = await isTeamMemberExist(team, user);

  if (!exist) {
    throw new Error('user not exist in this team');
  }

  return TeamMemberModel.deleteOne({
    team,
    user,
    role: 'Member',
  });
};

export const getTeamMembers = async (teamObjectId: string, role?: string) => {
  const query = {
    team: new Types.ObjectId(teamObjectId),
    ...(role && { role }),
  };
  return TeamMemberModel.aggregate([
    // @ts-ignore
    { $match: query },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userRef',
      },
    },
    {
      $project: {
        _id: 1,
        role: 1,
        user: { $arrayElemAt: ['$userRef', 0] },
      },
    },
  ]);
};
