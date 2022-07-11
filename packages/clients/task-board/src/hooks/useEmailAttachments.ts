import { gql, useQuery } from '@harmonie/services';
const GET_EMAIL_ATTACHMENTS = gql`
  query ($id: String) {
    getEmailAttachments(args: { id: $id }) {
      contentType
      contentBytes
      contentId
    }
  }
`;
export const useGetEmailAttachments = ({ id, skip }: { id?: string; skip?: boolean }) => {
  return useQuery(GET_EMAIL_ATTACHMENTS, {
    variables: { id },
    skip: skip || !id,
  });
};
