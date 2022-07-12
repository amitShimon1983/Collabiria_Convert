import React from 'react';
import { useSanitizeEmailBody } from '../../hooks';
import MailBodyPreview from './MailBodyPreview';
interface MailBodyProps {
  body: any;
  inlineAttachments: any;
}
const MailBody = ({ body, inlineAttachments }: MailBodyProps) => {
  const { sanitizeBody } = useSanitizeEmailBody({
    body,
    emailAttachments: inlineAttachments?.getEmailAttachments,
  });

  return (
    <>
      <div style={{ overflow: 'auto', display: 'block', paddingRight: 16 }}>
        <MailBodyPreview body={sanitizeBody} />
      </div>
    </>
  );
};

export default MailBody;
