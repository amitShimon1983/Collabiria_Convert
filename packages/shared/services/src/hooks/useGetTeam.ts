import { useQuery, gql } from './apollo';

export const GET_TEAM_QUERY = gql`
  query getTeam($teamObjectId: String) {
    getTeam(args: { teamObjectId: $teamObjectId }) {
      _id
      name
      organization {
        _id
      }
    }
  }
`;

const useGetTeam = (teamObjectId: string) => {
  return useQuery(GET_TEAM_QUERY, {
    variables: {
      teamObjectId,
    },
  });
};

export default useGetTeam;
