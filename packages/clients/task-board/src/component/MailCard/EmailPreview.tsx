import React, { useState } from 'react';
import MailHeader from './MailHeader';
import MailRecipients from './MailRecipients';
import MailBody from './MailBody';
import Attachment from './Attachment';
import { useCustomizations, useDeviceContext } from '@harmonie/services';
interface EmailPreviewProps {
  palette: any;
  selectedMail: { sentDateTime: any; subject: any; from: any; toRecipients: any; body: any };
  attachmentsToDisplay: any;
  onRemoveAttachment: any;
  inlineAttachments: any;
}
const EmailPreview = ({
  palette,
  selectedMail: { sentDateTime, subject, from, toRecipients, body },
  attachmentsToDisplay,
  onRemoveAttachment,
  inlineAttachments,
}: EmailPreviewProps) => {
  const { isMobile, isTablet } = useDeviceContext();
  const { customizations } = useCustomizations();
  const themeName = customizations?.settings?.theme?.name || '';
  return (
    <div className="email-preview-container">
      <div
        className="main"
        style={{
          backgroundColor: palette?.themeLighterAlt,
        }}
      >
        <div className="main-header">
          <MailHeader
            key={'mail-header'}
            sentDateTime={sentDateTime}
            subject={subject}
            fromAddress={from?.emailAddress?.address}
          />
        </div>
        <div className="addressees">
          <label>From:</label> {from?.emailAddress?.name}
        </div>
        <div className="addressees">
          <MailRecipients toRecipients={toRecipients} />
        </div>
        <div
          style={isMobile && !isTablet ? { width: '80%' } : {}}
          className={`content ${'html-content'} ${themeName !== 'default' ? 'content-dark' : ''}`}
        >
          <MailBody body={body?.content} inlineAttachments={inlineAttachments} />
        </div>
      </div>

      {!!attachmentsToDisplay.length && (
        <div className="attachments">
          {attachmentsToDisplay.map((attachment: any, n: number) => (
            <Attachment key={`attachment-${n}`} attachment={attachment} onRemove={onRemoveAttachment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailPreview;
