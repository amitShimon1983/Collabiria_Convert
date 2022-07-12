import React, { ComponentPropsWithRef, ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';
import AttachmentPreview from './AttachmentPreview';
import BaseModal from '../Modal/BaseModal';
import { utils } from '@harmonie/services';
import { Spinner, Tooltip, Icon } from '@harmonie/ui';
import { getFileTypeIconProps } from '@harmonie/services';
import { useDownloadAttachment } from '../../hooks';
declare let window: any;

const interactiveStyles = css`
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    filter: brightness(1.2);
  }
`;

const Root = styled.div<{
  isMobile: boolean;
  isError?: boolean;
  isInteractive?: boolean;
  fontSize?: string;
  width: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 18px;
  box-sizing: border-box;
  color: ${({ isError }) => (isError ? '#c92441' : 'inherit')};
  outline: none;
  background: inherit;
  border: 1px solid ${({ isError }) => (isError ? '#c92441' : '#9b9b9b')};
  border-radius: 4px;
  font-size: ${({ fontSize }) => {
    switch (fontSize) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      case 'large':
        return '16px';
    }
  }};
  height: ${({ isMobile }) => (isMobile ? '35px' : '30px')};
  width: ${({ width }) => width};
  @media screen and (max-width: 1300px) {
    width: 120px;
  }
  line-height: 30px;
  padding: 0px 15px 0px 5px;
  ${({ isInteractive }) => (isInteractive ? interactiveStyles : '')}

  & {
    .base {
      flex-grow: 1;
    }

    .ext {
      flex-shrink: 0;
    }

    i {
      flex-shrink: 0;
      margin-right: 9px;
    }
  }
`;

const StyledSpinner = styled(Spinner)`
  margin-right: 9px;
`;

const Name = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
`;

interface Attachment {
  attachmentId: string;
  name: string;
  type: string;
  contentType: string;
  contentUrl?: string;
  driveId?: string;
  itemId?: string;
}

const getErrorTooltipContent = (error: Error) => `Error downloading attachment: ${error.message}`;
const getAttachmentExtension = (attachmentType: string, attachmentName: string) =>
  attachmentType === '#microsoft.graph.itemAttachment' ? 'eml' : utils.getFileExtension(attachmentName);

const Attachment = ({
  attachment,
  emailId,
  fontSize,
  width = '120px',
  isMobile,
  ...rest
}: {
  attachment: Attachment;
  isMobile: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  width: '200px' | '120px';
  emailId?: string;
} & ComponentPropsWithRef<'button'>) => {
  const { download, loading, error } = useDownloadAttachment(attachment.contentType, attachment.name);
  const isInteractive = !!(emailId || attachment.contentUrl);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);

  const attachmentOnClick =
    attachment?.driveId && attachment?.itemId
      ? () =>
          setModalContent(
            <AttachmentPreview
              isMobile={isMobile}
              driveId={attachment?.driveId || ''}
              itemId={attachment?.itemId || ''}
              name={attachment.name}
              onClose={() => setModalContent(null)}
            />
          )
      : !emailId && attachment.contentUrl && !isMobile
      ? () => {
          window.open(attachment.contentUrl);
        }
      : () => isInteractive && !isMobile && download(attachment.attachmentId, emailId);
  const handleDownloadClick = (e: any) => {
    attachmentOnClick();
    e.stopPropagation();
  };

  const renderAttachments = () => {
    return (
      <Root
        isMobile={isMobile}
        isError={!!error}
        key={attachment.attachmentId}
        isInteractive={isInteractive}
        fontSize={fontSize}
        width={width}
        onClick={handleDownloadClick}
      >
        {loading ? (
          <StyledSpinner />
        ) : (
          <Icon
            {...getFileTypeIconProps({
              extension: getAttachmentExtension(attachment.type, attachment.name),
              size: 20,
            })}
          />
        )}
        <Name>{attachment.name}</Name>
      </Root>
    );
  };
  return (
    <>
      {!isMobile && (
        <Tooltip content={error ? getErrorTooltipContent(error) : attachment.name || 'attachment'}>
          {renderAttachments()}
        </Tooltip>
      )}
      {isMobile && renderAttachments()}
      {modalContent && (
        <BaseModal isMobile={isMobile} isOpen={!!modalContent} onDismiss={() => setModalContent(null)}>
          {modalContent}
        </BaseModal>
      )}
    </>
  );
};

export default Attachment;
