import { useMutation, gql } from './apollo';

export const CREATE_USER_QUERY = gql`
  mutation createUser($email: String) {
    createUser(args: { email: $email }) {
      _id
      firstName
      lastName
    }
  }
`;

const useCreateUser = () => {
  return useMutation(CREATE_USER_QUERY);
};

export default useCreateUser;
