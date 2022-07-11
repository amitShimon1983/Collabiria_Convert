import { Types } from 'mongoose';
import { OrganizationMemberModel } from '@harmonie/server-db';
import { isOrganizationMemberExist, validateOrganizationExist, validateUserExist } from '../utils';

export const addMemberToOrganization = async (organizationObjectId: string, userObjectId: string) => {
  const organization = await validateOrganizationExist(organizationObjectId);
  const user = await validateUserExist(userObjectId);
  const exist = await isOrganizationMemberExist(organization, user);

  if (exist) {
    throw new Error('user is already a member of this organization');
  }

  return await OrganizationMemberModel.create({
    organization,
    user,
    role: 'Member',
  });
};

export const removeMemberFromOrganization = async (organizationObjectId: string, userObjectId: string) => {
  const organization = await validateOrganizationExist(organizationObjectId);
  const user = await validateUserExist(userObjectId);
  const exist = await isOrganizationMemberExist(organization, user);

  if (!exist) {
    throw new Error('user is not a member of this organization');
  }

  return OrganizationMemberModel.deleteOne({
    organization,
    user,
    role: 'Member',
  });
};

export const getOrganizationMembers = async (organizationObjectId: string, role?: string) => {
  const query = {
    organization: new Types.ObjectId(organizationObjectId),
    ...(role && { role }),
  };
  return OrganizationMemberModel.aggregate([
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

export const getUserOrganizations = async (userObjectId: string, role?: string) => {
  const query = {
    user: new Types.ObjectId(userObjectId),
    ...(role && { role }),
  };
  return OrganizationMemberModel.aggregate([
    // @ts-ignore
    { $match: query },
    {
      $lookup: {
        from: 'organizations',
        localField: 'organization',
        foreignField: '_id',
        as: 'organizationRef',
      },
    },
    {
      $project: {
        _id: 1,
        role: 1,
        organization: { $arrayElemAt: ['$organizationRef', 0] },
      },
    },
  ]);
};
