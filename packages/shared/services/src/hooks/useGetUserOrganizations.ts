import { useQuery, gql } from './apollo';

export const GET_USER_ORGANIZATIONS_QUERY = gql`
  query getUserOrganizations($userObjectId: String, $role: String) {
    getUserOrganizations(args: { userObjectId: $userObjectId, role: $role }) {
      organization {
        _id
        name
        base64logo
        license {
          name
          type
        }
      }
      role
    }
  }
`;

const useGetUserOrganizations = (userObjectId: string, role?: string) => {
  return useQuery(GET_USER_ORGANIZATIONS_QUERY, {
    variables: {
      userObjectId,
      ...(role && { role }),
    },
  });
};

export default useGetUserOrganizations;
