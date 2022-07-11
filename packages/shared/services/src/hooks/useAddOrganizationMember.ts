import { useMutation, gql } from './apollo';

export const ADD_ORGANIZATION_MEMBER_QUERY = gql`
  mutation getUserOrganizations($userObjectId: String, $organizationObjectId: String) {
    getUserOrganizations(args: { userObjectId: $userObjectId, organizationObjectId: $organizationObjectId }) {
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

const useAddMemberToOrganization = () => {
  return useMutation(ADD_ORGANIZATION_MEMBER_QUERY);
};

export default useAddMemberToOrganization;
