import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { Organization } from '@harmonie/server-db';
import { v4 } from 'uuid';
import { organizationService } from '../../../services';
import { createOrganizationInput, getOrganizationInput, updateOrganizationInput } from './types';

@Resolver()
export default class OrganizationResolver {
  @Query(() => Organization)
  async getOrganization(@Arg('args') args: getOrganizationInput) {
    const { organizationObjectId } = args;
    return await organizationService.getOrganization(organizationObjectId);
  }

  @Mutation(() => Organization)
  async createOrganization(@Arg('args') args: createOrganizationInput) {
    // todo: get user id from token
    const { organizationName, userObjectId } = args;
    const organization: Organization = {
      name: organizationName,
      base64logo: `base64logo_${v4()}`,
      license: {
        name: 'Eli organization',
        type: 'regular',
      },
    };
    return await organizationService.createOrganization(userObjectId, organization);
  }

  @Mutation(() => Organization)
  async updateOrganization(@Arg('args') args: updateOrganizationInput) {
    const { organizationObjectId, organizationName } = args;
    return await organizationService.updateOrganization(organizationObjectId, { name: organizationName });
  }
}
