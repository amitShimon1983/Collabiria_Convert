import React, { CSSProperties, useState, ReactNode, useMemo } from 'react';
import { merge } from 'lodash';
import Highlighter from 'react-highlighter';
import { mergeStyles } from '@uifabric/merge-styles';
import './Mail.scss';
import Tag from '../Tag/Tag';
import ErrorBadge from './ErrorBadge';
import Attachment from './Attachment';
import { useDeviceContext, utils, useProfilePicture } from '@harmonie/services';
import { Persona, Tooltip } from '@harmonie/ui';

const containerStyle = { display: 'flex' };
const Mail = ({
  style,
  mail,
  onSelectMail,
  searchTerm,
  searchTerms,
  semanticColors,
  errorMessage,
  parentHeight,
  actions,
  className,
  attachmentsLimit = 2,
  onMailClick,
  isDisabled,
  dataCy,
}: {
  style: CSSProperties;
  mail: any;
  onSelectMail: (mail: any) => void;
  searchTerm?: string;
  searchTerms?: any;
  semanticColors: { [key: string]: string };
  dataCy?: string;
  errorMessage?: string;
  parentHeight?: string;
  actions: Array<{ name: string; action: (mail: any, idx: number) => ReactNode }>;
  className?: string;
  onMailClick?: (mail: any) => void;
  attachmentsLimit?: number;
  isDisabled?: boolean;
}) => {
  const { isMobile } = useDeviceContext();
  const [showError, setShowError] = useState(!!errorMessage);
  const hoverClass = mergeStyles({
    selectors: {
      ':hover': {
        backgroundColor: semanticColors.bodyBackgroundHovered,
      },
      ':active': {
        backgroundColor: semanticColors.bodyBackgroundHovered,
        outlineColor: semanticColors.inputFocusBorderAlt,
      },
      ':focus': {
        backgroundColor: semanticColors.bodyBackgroundHovered,
        outlineColor: semanticColors.inputFocusBorderAlt,
      },
    },
  });

  const { isTopResult, isRead, sentDateTime, bodyPreview, attachments, from } = mail;
  const { name, address } = from?.emailAddress || {};
  const isReadStyle = isRead ? {} : { borderLeft: '6px solid #1F9EFF' };

  const imagUrl = useProfilePicture(from?.emailAddress?.address || '');
  const attachmentsToShow = useMemo(() => attachments?.filter((att: any) => !att.isInline) || [], [attachments]);
  return (
    <div key={`MailList-${dataCy}`} data-cy={`MailList-${dataCy}`} style={containerStyle}>
      <div
        onClick={() => !isDisabled && onMailClick?.(mail)}
        tabIndex={0}
        className={`mail ${hoverClass} ${className ?? ''}`}
        style={merge({}, style, parentHeight ? { height: parentHeight, width: '100%' } : { width: '100%' })}
        onKeyPress={e => {
          if (e.key === 'Enter') onSelectMail(mail);
        }}
        onMouseDown={() => onSelectMail(mail)}
      >
        <div className="action-conainer">
          {actions?.map?.((action, idx) => {
            if (isDisabled && action.name === 'display') {
              return null;
            }
            return <div key={`container${idx}`}>{action.action(mail, idx)}</div>;
          })}
        </div>
        <div className="mail-container">
          <div className="persona">
            <Tooltip hidden={isMobile} content={name || address}>
              <Persona
                hidePersonaDetails={true}
                search={searchTerm || searchTerms?.from || searchTerms?.to}
                imageUrl={imagUrl}
              />
            </Tooltip>
          </div>
          <div className="content" style={parentHeight ? { maxHeight: parentHeight } : undefined}>
            <div className="categories">
              <div className="name">
                <Highlighter search={searchTerm || searchTerms?.from || searchTerms?.to || ''}>{name}</Highlighter>
              </div>
              <div className="date">{utils.getRelativeDisplayDate(new Date(sentDateTime))}</div>
            </div>
            <Tooltip hidden={isMobile} content={mail.subject}>
              <div className="info-line" style={{}}>
                <div data-cy={`MailList-${dataCy}-subject`} className={isRead ? 'subject' : 'subject-unread'}>
                  <Highlighter search={searchTerm || searchTerms?.subject || ''}>{mail.subject}</Highlighter>
                </div>
                {isTopResult && (
                  <div className="badge">
                    <Tag title={'Top Result'} />
                  </div>
                )}
              </div>
            </Tooltip>
            <Tooltip hidden={isMobile} content={bodyPreview}>
              <div className="preview">
                <Highlighter search={searchTerm || ''}>{bodyPreview}</Highlighter>
              </div>
            </Tooltip>
            {!!attachmentsToShow?.length && (
              <div className="attachments">
                {attachmentsToShow.slice(0, attachmentsLimit).map((attachment: any, idx: number) => (
                  <Attachment
                    isMobile={isMobile}
                    width={'120px'}
                    fontSize={'small'}
                    attachment={attachment}
                    key={`${attachment.id}-${idx}`}
                  />
                ))}
                {attachmentsToShow.length > attachmentsLimit && (
                  <div className="more">+{attachmentsToShow.length - attachmentsLimit}</div>
                )}
              </div>
            )}
          </div>
        </div>
        {showError ? (
          <div>
            <ErrorBadge
              showError={showError}
              message={errorMessage?.replace('Error creating task:', '')?.replace('Error creating task:', '')}
              dismissFunc={setShowError}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Mail;
