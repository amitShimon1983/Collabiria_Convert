import { gql, useCustomizations, useQuery } from '@harmonie/services';
import { Spinner } from '@harmonie/ui';
import React, { useRef } from 'react';
import EmailPreview from './EmailPreview';
const GET_EMAIL_BY_ID = gql`
  query ($itemId: String) {
    getEmailById(args: { itemId: $itemId }) {
      body {
        content
        contentType
      }
      from {
        emailAddress {
          address
          name
        }
      }
      toRecipients {
        emailAddress {
          address
          name
        }
      }
    }
  }
`;
const MailCard = ({
  selectedMail,
  onRemoveAttachment,
  removedAttachmentsIds,
  inlineAttachments,
}: {
  selectedMail: any;
  onRemoveAttachment: any;
  removedAttachmentsIds: any;
  inlineAttachments: any;
}) => {
  const parentRef = useRef(null);
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;
  if (!selectedMail) {
    return <></>;
  }
  const {
    data: emailData,
    error,
    loading,
  } = useQuery(GET_EMAIL_BY_ID, { variables: { itemId: selectedMail?.messageId } });
  const attachmentsToDisplay = ((selectedMail && selectedMail.attachments) || []).filter(
    (attachment: any) => !attachment.isInline && !removedAttachmentsIds.includes(attachment.attachmentId)
  );
  if (loading) {
    return <Spinner label={'loading...'} />;
  }
  return (
    <>
      <div className="mail-card" ref={parentRef}>
        <EmailPreview
          palette={palette}
          attachmentsToDisplay={attachmentsToDisplay}
          selectedMail={{ ...selectedMail, ...emailData.getEmailById }}
          onRemoveAttachment={onRemoveAttachment}
          inlineAttachments={inlineAttachments}
        />
      </div>
    </>
  );
};

export default MailCard;
