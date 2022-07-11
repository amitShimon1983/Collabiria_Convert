import {
  Organization,
  OrganizationMemberModel,
  TeamMemberModel,
  TeamModel,
  User,
  UserModel,
  Team,
  OrganizationModel,
} from '@harmonie/server-db';

export const validateTeamExist = async (teamObjectId: string) => {
  const team = await TeamModel.findById(teamObjectId);
  if (!team) {
    throw new Error('team does not exist');
  }
  return team;
};

export const validateUserExist = async (userObjectId: string) => {
  const user = await UserModel.findById(userObjectId);
  if (!user) {
    throw new Error('user does not exist');
  }
  return user;
};

export const isTeamMemberExist = async (team: Team, user: User) => {
  return TeamMemberModel.exists({ team, user });
};

export const isOrganizationMemberExist = async (organization: Organization, user: User) => {
  return OrganizationMemberModel.exists({ organization, user });
};

export const validateOrganizationExist = async (organizationObjectId: string) => {
  const organization = await OrganizationModel.findById(organizationObjectId);
  if (!organization) {
    throw new Error('organization does not exist');
  }
  return organization;
};

export const getDomainName = (email: string) => {
  const emailDomain = email.split('@')[1];
  const domainName = emailDomain.split('.')[0];
  return domainName;
};
