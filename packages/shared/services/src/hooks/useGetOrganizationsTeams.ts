import { useQuery, gql } from './apollo';

const GET_ORGANIZATIONS_TEAMS = gql`
  query getOrganizationsTeams($organizationObjectIds: [String]) {
    getOrganizationsTeams(args: { organizationObjectIds: $organizationObjectIds }) {
      _id
      name
      organization {
        _id
      }
    }
  }
`;

const useGetOrganizationsTeams = (organizationObjectIds: string[]) => {
  return useQuery(GET_ORGANIZATIONS_TEAMS, {
    skip: !organizationObjectIds || !organizationObjectIds.length,
    variables: {
      organizationObjectIds,
    },
  });
};

export default useGetOrganizationsTeams;
