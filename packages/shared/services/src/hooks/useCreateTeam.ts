import { useMutation, gql } from './apollo';

export const CREATE_TEAM_QUERY = gql`
  mutation createTeam($userObjectId: String, $teamName: String, $organizationObjectId: String) {
    createTeam(
      args: { userObjectId: $userObjectId, teamName: $teamName, organizationObjectId: $organizationObjectId }
    ) {
      _id
      name
      organization {
        _id
      }
    }
  }
`;

const useCreateTeam = () => {
  return useMutation(CREATE_TEAM_QUERY);
};

export default useCreateTeam;
