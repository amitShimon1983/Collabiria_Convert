import { useMutation, gql } from './apollo';

export const CREATE_ORGANIZATION_QUERY = gql`
  mutation createOrganization($userObjectId: String, $organizationName: String) {
    createOrganization(args: { userObjectId: $userObjectId, organizationName: $organizationName }) {
      _id
      name
      license {
        name
        type
      }
    }
  }
`;

const useCreateOrganization = () => {
  return useMutation(CREATE_ORGANIZATION_QUERY);
};

export default useCreateOrganization;
