import { Organization, OrganizationModel, OrganizationMemberModel, UserModel, utils } from '@harmonie/server-db';

export const createOrganization = async (userObjectId: string, organization: Organization) => {
  return await utils.runWithTransaction<Organization>(async session => {
    const user = await UserModel.findById(userObjectId);
    if (!user) {
      throw new Error('user does not exist');
    }

    const [organizationInstance] = await OrganizationModel.create([organization], { session });
    await OrganizationMemberModel.create(
      [
        {
          organization: organizationInstance,
          user,
          role: 'Admin',
        },
      ],
      { session }
    );

    return organizationInstance;
  });
};

export const getOrganization = async (organizationObjectId: string) => {
  return OrganizationModel.findById(organizationObjectId);
};

export const updateOrganization = async (organizationObjectId: string, organization: Organization) => {
  return OrganizationModel.findOneAndUpdate({ _id: organizationObjectId }, organization, { new: true });
};
