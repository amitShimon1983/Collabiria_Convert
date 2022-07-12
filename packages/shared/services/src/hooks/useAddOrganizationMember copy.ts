import { useMutation, gql } from './apollo';

const ADD_ORGANIZATION_MEMBER_QUERY = gql`
  mutation addMemberToOrganization($userObjectId: String, $organizationObjectId: String) {
    addMemberToOrganization(args: { userObjectId: $userObjectId, organizationObjectId: $organizationObjectId }) {
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
