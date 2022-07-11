import { useMutation, gql } from './apollo';

export const UPDATE_ORGANIZATION_QUERY = gql`
  mutation updateOrganization($organizationObjectId: String, $organizationName: String) {
    updateOrganization(args: { organizationObjectId: $organizationObjectId, organizationName: $organizationName }) {
      _id
      name
      license {
        name
        type
      }
    }
  }
`;

const useUpdateOrganization = () => {
  return useMutation(UPDATE_ORGANIZATION_QUERY);
};

export default useUpdateOrganization;
