import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { OrganizationMember } from '@harmonie/server-db';
import { organizationMemberService } from '../../../services';
import {
  addMemberToOrganizationInput,
  getOrganizationMembersInput,
  getUserOrganizationsInput,
  OrganizationMemberOutput,
} from './types';

@Resolver()
export default class OrganizationMemberResolver {
  @Query(() => [OrganizationMemberOutput])
  async getOrganizationMembers(@Arg('args') args: getOrganizationMembersInput) {
    const { organizationObjectId, role } = args;
    return await organizationMemberService.getOrganizationMembers(organizationObjectId, role);
  }

  @Query(() => [OrganizationMemberOutput])
  async getUserOrganizations(@Arg('args') args: getUserOrganizationsInput) {
    const { userObjectId, role } = args;
    return await organizationMemberService.getUserOrganizations(userObjectId, role);
  }

  @Mutation(() => OrganizationMember)
  async addMemberToOrganization(@Arg('args') args: addMemberToOrganizationInput) {
    const { organizationObjectId, userObjectId } = args;
    return await organizationMemberService.addMemberToOrganization(organizationObjectId, userObjectId);
  }

  @Mutation(() => OrganizationMember)
  async removeMemberFromOrganization(@Arg('args') args: addMemberToOrganizationInput) {
    const { organizationObjectId, userObjectId } = args;
    return await organizationMemberService.removeMemberFromOrganization(organizationObjectId, userObjectId);
  }
}
