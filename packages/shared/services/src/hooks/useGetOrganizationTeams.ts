import { useQuery, gql } from './apollo';

export const GET_ORGANIZATIONS_TEAMS_QUERY = gql`
  query getOrganizationTeams($organizationObjectId: String) {
    getOrganizationTeams(args: { organizationObjectId: $organizationObjectId }) {
      _id
      name
      organization {
        _id
      }
    }
  }
`;

const useGetOrganizationTeams = (organizationObjectId: string) => {
  return useQuery(GET_ORGANIZATIONS_TEAMS_QUERY, {
    variables: {
      organizationObjectId,
    },
  });
};

export default useGetOrganizationTeams;
