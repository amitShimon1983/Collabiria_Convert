import { promises } from '@harmonie/server-shared';
import { organizationMemberService, teamService, teamMemberService } from '../services';
import { createOrganization, createUser, createTeam } from './setup/dbHelper';

it('all', async () => {
  const membersCount = 10;

  // create admin user
  const userInstance = await createUser();
  const userObjectId = userInstance?._id?.toString();

  if (!userObjectId) {
    throw new Error('could not create user');
  }

  // create organization
  const organizationInstance = await createOrganization(userInstance?._id.toString());
  const organizationObjectId = organizationInstance?._id?.toString();

  if (!organizationObjectId) {
    throw new Error('could not create organization');
  }

  // create members and add to organization
  for (let x = 0; x < membersCount; x += 1) {
    const memberInstance = await createUser();
    const member = await organizationMemberService.addMemberToOrganization(
      organizationObjectId,
      memberInstance?._id.toString()
    );
    expect(member).toBeDefined();
    await promises.sleep(200);
  }

  const organizationMembers = await organizationMemberService.getOrganizationMembers(organizationObjectId, 'Member');
  expect(organizationMembers).toHaveLength(membersCount);

  // remove organization
  const organizationMember = organizationMembers[0];
  const removedOrganizationMember = await organizationMemberService.removeMemberFromOrganization(
    organizationObjectId,
    organizationMember?.user._id.toString()
  );
  const updateOrganizationMembers = await organizationMemberService.getOrganizationMembers(
    organizationObjectId,
    'Member'
  );
  expect(removedOrganizationMember).toBeDefined();
  expect(removedOrganizationMember.deletedCount).toEqual(1);

  expect(updateOrganizationMembers).toHaveLength(membersCount - 1);

  // create team
  const teamInstance = await createTeam(userObjectId, organizationObjectId);
  const teamObjectId = teamInstance?._id?.toString();

  if (!teamObjectId) {
    throw new Error('team not create organization');
  }

  // add members to team
  for (let x = 0; x < membersCount; x += 1) {
    const memberInstance = organizationMembers[x].user;
    const member = await teamMemberService.addMemberToTeam(teamObjectId, memberInstance?._id.toString());
    expect(member).toBeDefined();
    await promises.sleep(200);
  }

  const members = await teamMemberService.getTeamMembers(teamObjectId, 'Member');
  expect(members).toHaveLength(membersCount);

  // create another organization for same user
  await createOrganization(userInstance?._id.toString());
  const organizations = await organizationMemberService.getUserOrganizations(userObjectId);
  expect(organizations).toHaveLength(2);

  // create another team
  await createTeam(userObjectId, organizationObjectId);
  const teams = await teamService.getOrganizationTeams(organizationObjectId);
  expect(teams).toHaveLength(2);
});
