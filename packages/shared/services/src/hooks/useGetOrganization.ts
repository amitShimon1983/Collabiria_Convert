import { useQuery, gql } from './apollo';

export const GET_ORGANIZATIONS_QUERY = gql`
  query getOrganization($organizationObjectId: String) {
    getOrganization(args: { organizationObjectId: $organizationObjectId }) {
      _id
      name
      license {
        name
        type
      }
    }
  }
`;

const useGetOrganization = (organizationObjectId: string) => {
  return useQuery(GET_ORGANIZATIONS_QUERY, {
    variables: {
      organizationObjectId,
    },
  });
};

export default useGetOrganization;
