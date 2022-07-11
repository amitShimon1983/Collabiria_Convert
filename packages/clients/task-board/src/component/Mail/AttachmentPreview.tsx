import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import mobileClasses from './AttachmentsMobile.module.css';
import desktopClasses from './AttachmentsDesktop.module.css';
import { gql, useCustomizations, useQuery } from '@harmonie/services';
import { IconButton, Spinner, Text } from '@harmonie/ui';

export interface AttachmentPreviewProps {
  driveId: string;
  name: string;
  itemId: string;
  onClose: any;
  isMobile: boolean;
}
const headerContainerStyle = { width: '90%' };
const buttonContainerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-around' };
const downloadStyle = { padding: '1vh', paddingRight: '5vh' };
const MainContent = styled.div``;
const ErrorMessage = styled.div`
  color: #464775;
  font-size: 20px;
`;
const StyledHr = styled.hr`
  border: 0;
  margin: 0;
  height: 1.5px;
  background-image: linear-gradient(to right, rgba(140, 140, 140, 0.15), rgb(185, 178, 178), rgba(140, 140, 140, 0.15));
`;

const StyledIframe = styled.iframe`
  overflow: hidden;
  width: 95%;
  height: 80%;
  background-color: white;
  @media screen and (max-width: 1300px) {
    height: 80%;
  }
`;

const ComponentContainer = styled.div``;
export const GET_ATTACHMENTS_DETAILS = gql`
  query getTaskAttachmentsDetail($itemId: String!, $driveId: String!) {
    getTaskAttachmentsDetail(args: { itemId: $itemId, driveId: $driveId }) {
      thumbnailUrl
      downloadUrl
    }
  }
`;

const buttonLineStyles = css<{ background: string }>`
  content: '';
  position: absolute;
  height: 16px;
  width: 1px;
  background-color: ${({ background }) => background};
  top: 50%;
  left: 50%;
`;
const StyledExistIconButton = styled(IconButton)`
  margin: 0 0 0 auto;
  padding: 0;
  &::before {
    ${buttonLineStyles}
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    ${buttonLineStyles}
    transform: translate(-50%, -50%) rotate(45deg);
  }
  @media (max-width: 1300px) {
    margin: 0 1vh 0 auto;
  }
`;
declare let document: any;
declare let fetch: any;

const AttachmentPreview: React.FunctionComponent<AttachmentPreviewProps> = ({
  driveId,
  itemId,
  name,
  onClose,
  isMobile,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [isDownload, setIsDownload] = useState<boolean>();
  const [hasError, setHasError] = useState<string>();
  const classes = useMemo(() => (isMobile ? mobileClasses : desktopClasses), [isMobile]);
  const pingThumbnail = (thumbnailUrl: any) => {
    fetch(thumbnailUrl)
      .then((response: any) => {
        if (response.status === 200) {
          setThumbnailUrl(thumbnailUrl);
        }
        if (response.status === 406 || response.status === 404) {
          setHasError('NoFileToDisplay');
        }
        if (response.status === 400) {
          setThumbnailUrl('NoThumbnailToDisplay');
        }

        return response;
      })
      .then((data: any) => console.log({ data }))
      .catch((error: any) => console.log(error));
  };
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;

  const { data, loading, error } = useQuery(GET_ATTACHMENTS_DETAILS, {
    variables: { driveId, itemId },
    onCompleted: (data: any) => {
      if (data?.getTaskAttachmentsDetail?.thumbnailUrl) {
        pingThumbnail(data?.getTaskAttachmentsDetail?.thumbnailUrl);
      }
      if (data?.getTaskAttachmentsDetail?.downloadUrl) {
        setDownloadUrl(data?.getTaskAttachmentsDetail?.downloadUrl);
      }
    },
    onError: (error: any) => {
      setHasError(error);
    },
  });

  const download = () => {
    const link = document.createElement('a');
    link.download = name;
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownload(false);
  };

  const generateMainContent = () => {
    if (downloadUrl === 'NoDownloadLink') {
      return (
        <MainContent className={classes.mainContent}>
          <ErrorMessage>File not found.</ErrorMessage>
        </MainContent>
      );
    } else if (hasError || thumbnailUrl === 'NoThumbnailToDisplay') {
      return (
        <MainContent className={classes.mainContent}>
          <ErrorMessage>
            {isMobile ? 'Preview not available.' : 'Preview not available. Please download the file.'}
          </ErrorMessage>
        </MainContent>
      );
    } else {
      return (
        <MainContent className={classes.mainContent}>
          {thumbnailUrl ? (
            <StyledIframe
              sandbox="allow-scripts allow-top-navigation allow-downloads allow-top-navigation-by-user-activation"
              title="File Preview"
              frameBorder={0}
              src={thumbnailUrl}
            ></StyledIframe>
          ) : (
            <Spinner label="Loading document..." />
          )}
        </MainContent>
      );
    }
  };

  const previewElement = (
    <ComponentContainer className={classes.componentContainer}>
      <div style={buttonContainerStyle}>
        <div style={headerContainerStyle}>
          <Text level="large">Preview File</Text>
        </div>
        <div>
          <StyledExistIconButton
            title=""
            ariaLabel=""
            iconProps={{ iconName: 'Cancel' }}
            onClick={onClose}
            background={palette?.themePrimary}
          />
        </div>
      </div>
      <StyledHr />
      {generateMainContent()}
      {!isMobile && (
        <div style={downloadStyle}>
          <IconButton
            ariaLabel=""
            disabled={!!!downloadUrl || downloadUrl === 'NoDownloadLink'}
            title={'Download'}
            onClick={() => {
              setIsDownload(true);
              download();
            }}
            iconProps={{ iconName: 'CloudDownload' }}
          >
            {isDownload ? <Spinner labelPosition="right" label="Start download" /> : ''}
          </IconButton>
        </div>
      )}
    </ComponentContainer>
  );

  return previewElement;
};

export default AttachmentPreview;
