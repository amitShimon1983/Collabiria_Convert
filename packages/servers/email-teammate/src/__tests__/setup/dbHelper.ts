import { v4 } from 'uuid';
import { Organization, User } from '@harmonie/server-db';
import { organizationService, userService, teamService } from '../../services';

export const createUser = async () => {
  const user: User = {
    userId: `userId${v4()}`,
    firstName: `firstName${v4()}`,
    lastName: `lastName${v4()}`,
    email: `email${v4()}`,
    lastAccess: new Date(),
    token: `token${v4()}`,
    refreshToken: `refreshToken${v4()}`,
    tokenExpiration: new Date(),
    redirectUri: `redirectUri${v4()}`,
    tenantId: `tenantId${v4()}`,
    uniqueIds: [`uniqueIds${v4()}`],
  };
  return await userService.createUser(user);
};

export const createOrganization = async (userObjectId: string) => {
  const organization: Organization = {
    name: `name${v4()}`,
    base64logo: `base64logo_${v4()}`,
    license: {
      name: 'Eli organization',
      type: 'regular',
    },
  };
  return await organizationService.createOrganization(userObjectId, organization);
};

export const createTeam = async (userObjectId: string, organizationObjectId: string) => {
  return await teamService.createTeam(userObjectId, {
    name: `name${v4()}`,
    organization: organizationObjectId,
  });
};
