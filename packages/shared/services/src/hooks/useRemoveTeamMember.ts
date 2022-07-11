import { useMutation, gql } from './apollo';

export const REMOVE_TEAM_MEMBER_QUERY = gql`
  mutation removeMemberFromTeam($userObjectId: String, $teamObjectId: String) {
    removeMemberFromTeam(args: { userObjectId: $userObjectId, teamObjectId: $teamObjectId }) {
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

const useRemoveTeamMember = () => {
  return useMutation(REMOVE_TEAM_MEMBER_QUERY);
};

export default useRemoveTeamMember;
