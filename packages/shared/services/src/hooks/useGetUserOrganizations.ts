import { useQuery, gql } from './apollo';

export const GET_USER_ORGANIZATIONS_QUERY = gql`
  query getUserOrganizations($userObjectId: String, $role: String) {
    getUserOrganizations(args: { userObjectId: $userObjectId, role: $role }) {
      organization {
        _id
        name
        base64logo
      }
      role
    }
  }
`;

export const useGetUserOrganizations = (userObjectId: string, role?: string) => {
  return useQuery(GET_USER_ORGANIZATIONS_QUERY, {
    skip: !userObjectId,
    variables: {
      userObjectId,
      ...(role && { role }),
    },
  });
};
