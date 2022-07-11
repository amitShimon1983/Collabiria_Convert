import React from 'react';
import styled from 'styled-components';
import Attachment from './Attachment';

const Root = styled.div<{ isWrap?: boolean; isMobile: boolean }>`
  display: flex;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  height: 100%;
  ${({ isWrap, isMobile }) => (isWrap && !isMobile ? 'flex-wrap: wrap;' : '')}
  & > * {
    ${({ isWrap, isMobile }) => (isWrap && !isMobile ? 'margin-bottom: 10px;' : '')}
  }
`;

const AttachmentsList = ({
  className,
  attachments = [],
  maxLength = 2,
  emailId,
  fontSize = 'medium',
  width = '120px',
  isMobile,
}: {
  attachments?: Array<any>;
  className?: string;
  maxLength?: number;
  fontSize?: 'small' | 'medium' | 'large';
  width?: '200px' | '120px';
  emailId?: string;
  isMobile: boolean;
}) => {
  return (
    <Root isMobile={isMobile} className={className} isWrap={!Number.isFinite(maxLength)}>
      {attachments.slice(0, maxLength).map(attachment => (
        <Attachment
          isMobile={isMobile}
          width={width}
          fontSize={fontSize}
          attachment={attachment}
          key={attachment.id}
          emailId={emailId}
        />
      ))}
      {attachments.length > maxLength && `+ ${attachments.length - maxLength}`}
    </Root>
  );
};

export default AttachmentsList;
