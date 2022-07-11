import { useQuery, gql } from './apollo';

export const GET_ORGANIZATION_MEMBERS_QUERY = gql`
  query getOrganizationMembers($organizationObjectId: String, $role: String) {
    getOrganizationMembers(args: { organizationObjectId: $organizationObjectId, role: $role }) {
      user {
        _id
        firstName
        lastName
      }
      role
    }
  }
`;

const useGetOrganizationMembers = (organizationObjectId: string, role?: string) => {
  return useQuery(GET_ORGANIZATION_MEMBERS_QUERY, {
    variables: {
      organizationObjectId,
      ...(role && { role }),
    },
  });
};

export default useGetOrganizationMembers;
