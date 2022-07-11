import React, { useRef } from 'react';
import ShareActions from './ShareActions';
import classes from './MailCardMobile.module.scss';
import { getFileTypeIconProps, useCustomizations, useDeviceContext } from '@harmonie/services';
import { Icon, IconButton, Persona, Drawer } from '@harmonie/ui';
import { utils } from '@harmonie/services';
import PotentialTaskView from '../PotentialTask/PotentialTaskView';
import { useProfilePicture } from '@harmonie/services';

interface MailCardMobileProps {
  selectedMail: any;
  onRemoveAttachment: any;
  removedAttachmentsIds: any;
  isCalloutVisible: boolean;
  toggleIsCalloutVisible: any;
}
const MailCardMobile = ({
  selectedMail,
  onRemoveAttachment,
  removedAttachmentsIds,
  isCalloutVisible,
  toggleIsCalloutVisible,
}: MailCardMobileProps) => {
  const parentRef = useRef(null);
  const { isMobile } = useDeviceContext();
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;
  if (!selectedMail) {
    return <></>;
  }

  const attachmentsToDisplay = ((selectedMail && selectedMail.attachments) || []).filter(
    (attachment: any) => !attachment.isInline && !removedAttachmentsIds.includes(attachment.attachmentId)
  );
  const label = selectedMail?.toRecipients
    ?.map(({ emailAddress }: { emailAddress: any }) => emailAddress.name || emailAddress.address)
    .join(', ');
  const displayPreviewAsFullPage = isMobile && isCalloutVisible;
  return (
    <>
      <div className="mail-card-mobile" ref={parentRef}>
        <EmailPreview
          isMobile={isMobile}
          palette={palette}
          selectedMail={selectedMail}
          label={label}
          attachmentsToDisplay={attachmentsToDisplay}
          onRemoveAttachment={onRemoveAttachment}
          toggleIsCalloutVisible={toggleIsCalloutVisible}
          isCalloutVisible={isCalloutVisible}
        />
        <Drawer isOpen={displayPreviewAsFullPage}>
          <PotentialTaskView
            needToRender={displayPreviewAsFullPage}
            isMobile={isMobile}
            email={selectedMail}
            actions={[]}
            onClose={() => {
              console.log('mobile');
            }}
          />
        </Drawer>
      </div>
    </>
  );
};

export default MailCardMobile;
interface EmailPreviewProp {
  palette: any;
  selectedMail: any;
  label: any;
  attachmentsToDisplay: any;
  onRemoveAttachment: any;
  toggleIsCalloutVisible: any;
  isCalloutVisible: boolean;
  isMobile: boolean;
}

function EmailPreview({
  palette,
  selectedMail,
  label,
  attachmentsToDisplay,
  onRemoveAttachment,
  toggleIsCalloutVisible,
  isCalloutVisible,
  isMobile,
}: EmailPreviewProp) {
  const blurOnMobile = isCalloutVisible && isMobile;
  const profileFromPic = useProfilePicture(selectedMail?.from?.emailAddress?.address || '');
  return (
    <>
      <div
        className="main"
        style={{
          backgroundColor: palette?.themeLighterAlt,
        }}
      >
        <div className={`side ${blurOnMobile && classes?.isOpen}`}>
          <Persona imageUrl={profileFromPic || ''} text={selectedMail?.from?.emailAddress?.name || ''} />
        </div>
        <div style={isMobile ? { width: '80%' } : {}} className="content">
          <ShareActions
            id={'share-actions'}
            item={selectedMail}
            previewUrl={selectedMail?.webLink || ''}
            toggleIsCalloutVisible={toggleIsCalloutVisible}
            isCalloutVisible={isCalloutVisible}
          />
          <div className={`title ${blurOnMobile && classes?.isOpen}`}>{selectedMail?.subject}</div>
          <div className={`sent-date ${blurOnMobile && classes.isOpen}`}>
            {utils.getRelativeDisplayDate(new Date(selectedMail.sentDateTime))}
          </div>
          <div className="addressees from">
            <label>From:</label> {selectedMail?.from?.emailAddress?.name}
          </div>
          <div className="addressees from">
            <label>To:</label> {label}
          </div>
          <div className="preview" style={{ overflow: 'hidden' }}>
            {selectedMail.bodyPreview}
          </div>
        </div>
      </div>
      {!!attachmentsToDisplay.length && (
        <div className="attachments">
          <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
            {attachmentsToDisplay.map((attachment: any, n: any) => (
              <div key={n} className="attachment" style={{ backgroundColor: palette?.themeLighterAlt }}>
                <div className="icon">
                  <Icon
                    {...getFileTypeIconProps({
                      extension:
                        attachment.type === '#microsoft.graph.itemAttachment'
                          ? 'eml'
                          : utils.getFileExtension(attachment.name),
                      size: 40,
                      imageFileType: 'png',
                    })}
                  />
                </div>
                <div className="content" style={isMobile ? { width: '85%' } : {}}>
                  <div className="filename">{attachment.name}</div>
                  <div className="size">{utils.humanFileSize(attachment?.size)}</div>
                </div>
                <IconButton
                  onClick={() => onRemoveAttachment(attachment)}
                  iconProps={{ iconName: 'Clear' }}
                  title="Remove Attachment"
                  ariaLabel="Remove Attachment"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
