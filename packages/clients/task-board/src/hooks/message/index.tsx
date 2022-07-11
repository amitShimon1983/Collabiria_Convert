import { gql, useMutation } from '@harmonie/services';

export const SHARE_MESSAGE = gql`
  mutation CreateMessage($messageId: String!) {
    createMessage(args: { messageId: $messageId }) {
      _id
    }
  }
`;
export const useShareMessage = () => {
  const [shareMail, { data, error, loading }] = useMutation(SHARE_MESSAGE);
  return { data, error, loading, shareMail };
};
