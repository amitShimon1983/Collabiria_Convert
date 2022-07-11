import { useMutation, gql } from './apollo';

export const ADD_TEAM_MEMBER_QUERY = gql`
  mutation addMemberToTeam($userObjectId: String, $teamObjectId: String) {
    addMemberToTeam(args: { userObjectId: $userObjectId, teamObjectId: $teamObjectId }) {
      _id
      user {
        _id
      }
      team {
        _id
      }
      role
    }
  }
`;

const useAddTeamMember = () => {
  return useMutation(ADD_TEAM_MEMBER_QUERY);
};

export default useAddTeamMember;
