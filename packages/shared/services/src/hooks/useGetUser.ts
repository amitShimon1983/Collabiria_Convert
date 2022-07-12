import { useGetUserOrganizations } from './useGetUserOrganizations';
import useGetOrganizationsTeams from './useGetOrganizationsTeams';
import { appContextVar } from '../apollo';
import { useQuery, gql, useReactiveVar } from './apollo';

export const GET_USER_QUERY = gql`
  query getUser($userObjectId: String) {
    getUser(args: { userObjectId: $userObjectId }) {
      _id
      email
      firstName
      lastAccess
      lastName
      tenantId
    }
  }
`;

export const useGetUser = () => {
  const {
    user: {
      data: { _id: userObjectId },
    },
  } = useReactiveVar(appContextVar);

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_QUERY, {
    skip: !userObjectId,
    variables: {
      userObjectId,
    },
  });

  const {
    data: organizations,
    loading: organizationsLoading,
    error: organizationsError,
  } = useGetUserOrganizations(userObjectId, 'Admin');

  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useGetOrganizationsTeams(
    organizations?.getUserOrganizations.map(({ organization }: { organization: any }) => organization._id)
  );

  return {
    loading: userLoading || organizationsLoading || teamsLoading,
    error: userError || organizationsError || teamsError,
    data:
      user && organizations && teams
        ? {
            ...(user && user.getUser),
            organizations: organizations?.getUserOrganizations,
            teams: teams?.getOrganizationsTeams,
          }
        : null,
  };
};
