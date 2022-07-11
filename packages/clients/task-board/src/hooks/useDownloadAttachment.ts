import React, { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@harmonie/services';

declare let document: any;
export const GET_ATTACHMENTS = gql`
  mutation GetMailAttachmentBinary($emailId: String!, $attachmentId: String!) {
    getMailAttachmentBinary(args: { emailId: $emailId, attachmentId: $attachmentId }) {
      attachmentUrl
    }
  }
`;
const downloadFile = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  // link.target = '_parent';
  link.setAttribute('download', name);

  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const useDownloadAttachment = (contentType: string, attachmentName: string) => {
  const [downloadAttachment, { data, error, loading }] = useMutation(GET_ATTACHMENTS);

  useEffect(() => {
    if (data?.getMailAttachmentBinary?.attachmentUrl) {
      const { attachmentUrl } = data?.getMailAttachmentBinary;

      downloadFile(attachmentUrl, attachmentName);
    }
  }, [data?.getMailAttachmentBinary, contentType, attachmentName]);

  const download = useCallback(
    (attachmentId: string, emailId?: string) => {
      downloadAttachment({
        variables: { emailId, attachmentId },
      });
    },
    [downloadAttachment]
  );

  return {
    download,
    error,
    loading,
  };
};
