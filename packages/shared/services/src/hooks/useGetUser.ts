import { useQuery, gql } from './apollo';

export const GET_USER_QUERY = gql`
  query getUser($email: String) {
    getUser(args: { email: $email }) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const useGetUser = (email: string) => {
  return useQuery(GET_USER_QUERY, {
    variables: {
      email,
    },
  });
};

export default useGetUser;
