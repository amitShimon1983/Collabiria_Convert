import React, { useMemo } from 'react';
import styled from 'styled-components';
import './PotentialTask.scss';
import { gql, useQuery, theme, utils, useProfilePicture } from '@harmonie/services';
import { DirectionalHint, TooltipHost } from '@fluentui/react';
import AttachmentsList from '../Mail/AttachmentsList';
import { ErrorState, IconButton, Persona, Spinner, Text } from '@harmonie/ui';
import { useGetEmailAttachments, useSanitizeEmailBody } from '../../hooks';

import HtmlMailBody from '../HtmlBody/HtmlMailBody';
import RecipientsList from '../RecipientsList/RecipientsList';

export interface Props {
  email: any;
  actions: any;
  onClose: any;
  isMobile?: boolean;
  needToRender?: boolean;
}

const OutlookIcon = styled.img`
  width: 24px;
  height: 24px;
  max-width: 24px;
`;
const fromStyle = { display: 'flex', width: '100%' };
const StyledIconButton = styled(IconButton)<{ color: string }>`
  position: relative;
  width: 2vh;
  height: 2vh;
  padding: 0;
  color: ${({ color }) => color}; ;
`;

const ConversationWrapper = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2vh;
  background-color: ${({ background }) => background};
  height: 89.5%;
  @media (max-width: 1300px) {
    height: 86%;
  }
`;

const MoreButton = styled(StyledIconButton)`
  .ms-Button-menuIcon {
    display: none;
  }
`;

const MenuItemWrapper = styled.div`
  margin-bottom: 1vh;
  align-items: center;
  padding: 10px 0;
  margin: 0 15px;
  box-sizing: border-box;
  li:not(:last-child) & {
    border-bottom: 1px solid #dfdfdf;
  }
`;
const StyledHr = styled.hr<{ background: string }>`
  border: 0;
  margin: 0;
  /* margin-bottom:.5vh; */
  height: 1.5px;
  background-image: linear-gradient(to right, rgba(140, 140, 140, 0.15), rgb(185, 178, 178), rgba(140, 140, 140, 0.15));
`;
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
    }
  }
`;
const StyledError = styled(ErrorState)`
  position: static;
  width: auto;
  align-self: center;
  & .text {
    white-space: normal;
  }
`;

const PotentialTaskView: React.SFC<Props> = ({ email, actions, onClose, isMobile, needToRender = true }) => {
  const { data, loading: attachmentsLoading } = useGetEmailAttachments({ id: email?.messageId });
  const { data: emailData, error, loading } = useQuery(GET_EMAIL_BY_ID, { variables: { itemId: email?.messageId } });
  const { sanitizeBody, loading: useSanitizeLoading } = useSanitizeEmailBody({
    body: emailData?.getEmailById?.body?.content,
    emailAttachments: data?.getEmailAttachments,
  });
  const isLoading = (!!!sanitizeBody || loading || attachmentsLoading || useSanitizeLoading) && needToRender;
  const profileFromPic = useProfilePicture(email?.from?.emailAddress?.address || '');
  const attachmentsWithoutInline = useMemo(
    () => email?.attachments?.filter((att: any) => !att.isInline) || [],
    [email?.attachments]
  );

  const { palette } = theme.getSemanticTheme();

  if ((emailData?.getEmailById && !emailData?.getEmailById?.body) || error) {
    return (
      <div className={'error-container-potential-task'}>
        {!isMobile && (
          <div className={'on-error-exist-button'}>
            <IconButton
              ariaLabel=""
              title=""
              className=""
              data-cy={'potentialTaskExitButton'}
              iconProps={{ iconName: 'Cancel' }}
              onClick={onClose}
            />
          </div>
        )}
        <StyledError
          isMobile={false}
          error={{ message: 'Something went wrong. Please try again later.', name: 'error' }}
        />
      </div>
    );
  }

  return !isLoading ? (
    <>
      <div
        data-cy="potentialTaskContainer"
        className={`container-potential-task `}
        style={
          isMobile
            ? {
                backgroundColor: palette?.white,
                width: '100%',
                marginTop: '2vh',
                borderRadius: '20px',
              }
            : { backgroundColor: palette?.white }
        }
      >
        <>
          <div className={'subject-container-potential-task'}>
            <OutlookIcon
              className="logo-potential-task"
              src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets/brand-icons/product/png/outlook_32x1.png"
            />
            <TooltipHost
              hostClassName={'ms-TooltipHost-header'}
              directionalHint={DirectionalHint.topLeftEdge}
              content={email.subject}
              hidden={isMobile}
              id={email.subject}
            >
              <div className="potential__task__subject">
                <Text style={isMobile ? { maxWidth: '90%' } : {}}>{email.subject}</Text>
              </div>
            </TooltipHost>
            {!isMobile && (
              <IconButton
                ariaLabel=""
                data-cy={'potentialTaskExitButton'}
                iconProps={{ iconName: 'Cancel' }}
                onClick={onClose}
              />
            )}
          </div>
          <StyledHr background={palette?.themePrimary} />
          <ConversationWrapper background={palette?.neutralLighter}>
            <div className={'message-container'} style={{ background: palette?.white }}>
              <div className={'message-details-container'}>
                <div className="persona-potential-task">
                  <Persona text={email?.from?.emailAddress?.name} hidePersonaDetails={true} imageUrl={profileFromPic} />
                </div>
                <div className={'conversation-container'}>
                  <div style={fromStyle}>
                    <Text>
                      <b className={'from'}>
                        {email?.from?.emailAddress?.name} {`<${email?.from?.emailAddress?.address}>`}
                      </b>
                    </Text>
                    {!!actions?.length && (
                      <div className={'collapse-icon-potential-task'}>
                        <TooltipHost hidden={isMobile} content={'More'} id={'More'}>
                          <MoreButton
                            data-cy="potentialTaskMoreButton"
                            color={palette?.black}
                            iconProps={{ iconName: 'MoreVertical' }}
                            ariaLabel="More"
                            menuProps={{
                              items: actions?.map?.((action: any, idx: number) => {
                                const act = {
                                  key: idx,
                                  onRender: () => <MenuItemWrapper>{action(email, idx)}</MenuItemWrapper>,
                                };
                                return act;
                              }),
                              directionalHint: DirectionalHint.bottomRightEdge,
                              isBeakVisible: true,
                            }}
                          ></MoreButton>
                        </TooltipHost>
                      </div>
                    )}
                  </div>
                  <Text>
                    <div className={'information-container'}>
                      <div className={'data'}>{utils.setDate(email.sentDateTime)}</div>
                      <RecipientsList emailAddress={email?.toRecipients} title={'To:'} isMobile={!!isMobile} />
                      {!!emailData?.getEmailById?.emailAddress?.length ? (
                        <RecipientsList emailAddress={email?.toRecipients} title={'Cc:'} isMobile={!!isMobile} />
                      ) : (
                        ''
                      )}
                    </div>
                  </Text>
                </div>
              </div>
              <div
                className={'message-body-container'}
                style={email?.attachments?.length ? { height: '76%' } : { height: '86%' }}
              >
                {attachmentsWithoutInline && attachmentsWithoutInline.length && !isMobile ? (
                  <>
                    <div className="attachments-container">
                      <AttachmentsList
                        data-cy="potentialTaskAttachmentsList"
                        width={'200px'}
                        isMobile={!!isMobile}
                        fontSize={'medium'}
                        emailId={email?.messageId}
                        attachments={attachmentsWithoutInline}
                        maxLength={Infinity}
                      />
                    </div>
                    <StyledHr background={palette?.black} />
                  </>
                ) : (
                  ''
                )}
                <Text>
                  <HtmlMailBody
                    isMobile={false}
                    html={sanitizeBody}
                    isInlineAttachmentsLoaded={!!data?.getEmailAttachments}
                  />
                </Text>
              </div>
            </div>
          </ConversationWrapper>
        </>
      </div>
    </>
  ) : (
    <div
      className={'container-potential-task'}
      style={isMobile ? { background: 'none' } : { backgroundColor: palette?.white }}
    >
      <Spinner label={'Loading...'} />
    </div>
  );
};

export default PotentialTaskView;
