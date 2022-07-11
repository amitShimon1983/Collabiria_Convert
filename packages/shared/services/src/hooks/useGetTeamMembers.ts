import { useQuery, gql } from './apollo';

export const GET_TEAM_MEMBERS_QUERY = gql`
  query getTeamMembers($teamObjectId: String, $role: String) {
    getTeamMembers(args: { teamObjectId: $teamObjectId, role: $role }) {
      user {
        _id
        firstName
        lastName
      }
      role
    }
  }
`;

const useGetTeamMembers = (teamObjectId: string, role?: string) => {
  return useQuery(GET_TEAM_MEMBERS_QUERY, {
    variables: {
      teamObjectId,
      ...(role && { role }),
    },
  });
};

export default useGetTeamMembers;
