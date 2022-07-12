import React from 'react';
import { utils, useDeviceContext } from '@harmonie/services';
import { AttachmentIcon, IconButton } from '@harmonie/ui';
import './MailCard.scss';
interface AttachmentProps {
  attachment: any;
  onRemove: any;
}
const Attachment = ({ attachment, onRemove }: AttachmentProps) => {
  const { isMobile } = useDeviceContext();

  return (
    <div className="attachment">
      <div className="attachment-container">
        <div className="icon">
          <AttachmentIcon
            size={32}
            attachmentType={attachment.type}
            imageFileType={'png'}
            attachmentName={attachment.name}
          />
        </div>

        <div className="attachment-content" style={isMobile ? { width: '85%' } : {}}>
          <div className="filename">{attachment.name}</div>
          <div className="size">{utils.humanFileSize(attachment.size)}</div>
        </div>
      </div>
      <IconButton
        onClick={() => onRemove(attachment)}
        iconProps={{ iconName: 'Clear' }}
        title="Remove Attachment"
        ariaLabel="Remove Attachment"
      />
    </div>
  );
};

export default Attachment;
