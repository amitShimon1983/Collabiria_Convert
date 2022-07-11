import { useMutation, gql } from './apollo';

export const UPDATE_USER_QUERY = gql`
  mutation updateUser($userObjectId: String, $firstName: String, $lastName: String) {
    updateUser(args: { userObjectId: $userObjectId, firstName: $firstName, lastName: $lastName }) {
      _id
      firstName
      lastName
    }
  }
`;

const useUpdateUser = () => {
  return useMutation(UPDATE_USER_QUERY);
};

export default useUpdateUser;
