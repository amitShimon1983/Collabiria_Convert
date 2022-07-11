import { v4 } from 'uuid';
import { UserModel, Organization, Team, User } from '@harmonie/server-db';
import { organizationService, teamService } from '..';
import { getDomainName } from '../utils';

export const createUser = async (user: User) => {
  return await UserModel.create(user);
};

export const getUser = async (email: string) => {
  return UserModel.findOne({ email });
};

export const updateUser = async (userObjectId: string, user: any) => {
  return UserModel.findOneAndUpdate({ _id: userObjectId }, user, { new: true });
};

export async function getOrCreateUser(
  upn: any,
  graphJWT: any,
  encryptedAccessToken: string,
  encryptedRefreshToken: string,
  expiresIn: Date,
  redirectUri: string,
  geography: any,
  oid: any,
  tid: any
) {
  let user;
  let isNewUser = false;
  user = await UserModel.findOne({ email: upn });
  if (!user?._id) {
    isNewUser = true;
    user = await createUser({
      firstName: graphJWT?.given_name,
      lastName: graphJWT?.family_name,
      email: upn,
      lastAccess: new Date(),
      token: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      tokenExpiration: expiresIn,
      redirectUri: redirectUri,
      geography,
      uniqueIds: [oid],
      tenantId: tid,
      userId: oid,
    });

    const domainName = getDomainName(upn);
    const organization: Organization = {
      name: `${domainName}'s organization`,
      base64logo: `base64logo_${v4()}`,
      license: {
        name: `${domainName} organization`,
        type: 'regular',
      },
    };
    const organizationInstance = await organizationService.createOrganization(user._id, organization);
    if (!organizationInstance) {
      throw new Error('failed to create organization');
    }
    const team: Team = {
      organization: organizationInstance?._id,
      name: `${graphJWT?.given_name}'s team`,
    };
    // create teams
    const teamInstance = await teamService.createTeam(user._id, team);
    if (!teamInstance) {
      throw new Error('failed to create organization');
    }
  } else {
    user = await updateUser(user._id, {
      firstName: graphJWT?.given_name,
      lastName: graphJWT?.family_name,
      email: upn,
      lastAccess: new Date(),
      token: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      tokenExpiration: expiresIn,
      redirectUri: redirectUri,
      userId: oid,
      geography,
    });
  }
  return { user, isNewUser };
}
