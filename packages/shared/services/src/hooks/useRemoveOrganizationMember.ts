import { useMutation, gql } from './apollo';

export const REMOVE_ORGANIZATION_MEMBER_QUERY = gql`
  mutation removeMemberFromOrganization($userObjectId: String, $organizationObjectId: String) {
    removeMemberFromOrganization(args: { userObjectId: $userObjectId, organizationObjectId: $organizationObjectId }) {
      _id
      user {
        _id
        firstName
        lastName
      }
      role
    }
  }
`;

const useRemoveMemberToOrganization = () => {
  return useMutation(REMOVE_ORGANIZATION_MEMBER_QUERY);
};

export default useRemoveMemberToOrganization;
