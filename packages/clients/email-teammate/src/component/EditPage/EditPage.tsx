/* eslint-disable @welldone-software/modules-engagement */
import React, { useState, FunctionComponent } from 'react';
import EditPageFooter from './EditPageFooter';
import classes from './EditPage.module.scss';
import { appContextVar, useBoolean, useDeviceContext, useReactiveVar } from '@harmonie/services';
import { Spinner } from '@harmonie/ui';
import MailCardMobile from '../MailCard/MailCardMobile';
import MailCard from '../MailCard/MailCard';
import { useGetEmailAttachments, useShareMessage } from '../../hooks';

interface EditPageProps {
  selectedMail: { [key: string]: any } | null;
  onBack: () => void;
}

const EditPage: FunctionComponent<EditPageProps> = ({ selectedMail, onBack }) => {
  const { isMobile } = useDeviceContext();
  const { user } = useReactiveVar(appContextVar);
  const { data: sharedData, error, loading: sharedMailLoading, shareMail } = useShareMessage();
  const [removedAttachmentsIds, setRemovedAttachmentsIds] = useState<{ [key: string]: any }[]>([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const mailAttachments = selectedMail?.attachments;
  const { data, loading: attachmentsLoading } = useGetEmailAttachments({ id: selectedMail?.messageId });

  const onRemoveAttachment = (removedAttachment: any) => {
    setRemovedAttachmentsIds([...removedAttachmentsIds, removedAttachment.attachmentId]);
  };

  const goBack = () => {
    setErrorMessage(undefined);
    onBack();
  };

  const displayFooter = !isMobile || (isMobile && !isCalloutVisible);
  return (
    <div className={`${classes['edit-page']} ${selectedMail && classes['active']}`}>
      {!user && <Spinner label={'Getting info...'} />}
      {selectedMail?.messageId && !attachmentsLoading ? (
        <React.Fragment>
          <div style={isMobile ? { overflowY: 'hidden' } : {}} className={classes['card']}>
            {isMobile ? (
              <MailCardMobile
                toggleIsCalloutVisible={toggleIsCalloutVisible}
                isCalloutVisible={isCalloutVisible}
                selectedMail={selectedMail}
                onRemoveAttachment={onRemoveAttachment}
                removedAttachmentsIds={removedAttachmentsIds}
              />
            ) : (
              <MailCard
                selectedMail={selectedMail}
                onRemoveAttachment={onRemoveAttachment}
                removedAttachmentsIds={removedAttachmentsIds}
                inlineAttachments={data}
              />
            )}
          </div>
          {!!displayFooter && (
            <EditPageFooter
              errorMessage={errorMessage}
              loading={sharedMailLoading}
              doShareMail={async () => {
                const res = await shareMail({ variables: { messageId: selectedMail.messageId } });
                if (res?.data?.createMessage?._id) {
                  onBack();
                }
              }}
              disable={sharedMailLoading}
              onBack={goBack}
            />
          )}
        </React.Fragment>
      ) : (
        <Spinner label={'Getting info...'} />
      )}
    </div>
  );
};

export default EditPage;
