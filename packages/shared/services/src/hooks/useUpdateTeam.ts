import { useMutation, gql } from './apollo';

export const UPDATE_TEAM_QUERY = gql`
  mutation updateTeam($organizationObjectId: String, $teamName: String, $teamObjectId: String) {
    updateTeam(
      args: { organizationObjectId: $organizationObjectId, teamName: $teamName, teamObjectId: $teamObjectId }
    ) {
      _id
      name
      organization {
        _id
      }
    }
  }
`;

const useUpdateTeam = () => {
  return useMutation(UPDATE_TEAM_QUERY);
};

export default useUpdateTeam;
