import React from 'react';
import styled from 'styled-components';
import './MailList.scss';
import { VirtualList, ErrorState, EmptyState, Spinner } from '@harmonie/ui';
import Mail from '../Mail/Mail';
import { theme as appTheme } from '@harmonie/services';

const StyledError = styled(ErrorState)`
  position: static;
  width: auto;
  align-self: center;
  & .text {
    white-space: normal;
  }
`;

const StyledMail = styled(Mail)<{ color: string; isDisabled?: boolean; background?: string }>`
  color: ${({ color }) => color};
  transition: background-color 0.2s ease, filter 0.2s ease;
  ${({ background }) =>
    background
      ? `
  &:not(:hover) {
    background-color: ${background}; 
  }`
      : ''}
  ${({ isDisabled }) =>
    isDisabled
      ? `
    opacity: 0.6;
    cursor: default;
  `
      : ''}
`;

function MailList({
  cache,
  onSelectMail,
  showOnlyFocused,
  searchTerm,
  searchTerms,
  theme,
  semanticColors,
  styleDirection = null,
  className = '',
  mailsErrors = [],
  conversationsIds = [],
  actions = [],
  loading,
  error,
  data,
  fetchMore,
  updateQuery,
  tasksNumber,
  mailAttachmentsLimit,
  mailBackground,
  additionalMailClassName,
  onMailClick,
  isReportWidthToColumn,
}: {
  onSelectMail: (mail: any) => void;
  cache: any;
  showOnlyFocused: boolean;
  searchTerm?: string;
  searchTerms?: any;
  theme: string;
  semanticColors: { [key: string]: string };
  styleDirection?: any;
  className?: string;
  mailsErrors?: Array<{ id: string; errorMessage: string }>;
  conversationsIds?: Array<string>;
  actions?: any;
  loading: boolean;
  error: Error;
  data: any;
  fetchMore: any;
  updateQuery: any;
  tasksNumber?: number;
  mailAttachmentsLimit?: number;
  mailBackground?: string;
  additionalMailClassName?: string;
  onMailClick?: (mail: any) => void;
  isReportWidthToColumn?: boolean;
}) {
  if (error) {
    return <StyledError error={error} />;
  }

  if (loading || !data) {
    return <Spinner label="Loading..." />;
  }

  const { palette } = appTheme.getSemanticTheme();

  const {
    pageInfo: { hasNextPage, endCursor },
    results,
  } = data;

  if (!results || (results.length === 0 && !hasNextPage)) {
    return <EmptyState isDefaultTheme={theme === 'default'} />;
  }

  const loadMoreRows = async () => {
    if (!hasNextPage) {
      return;
    }
    try {
      const { data: fetchData, loading } = await fetchMore({
        variables: {
          notifyOnNetworkStatusChange: true,
          endCursor,
        },
        updateQuery,
      });

      return {
        records: fetchData?.getMails?.results as any[],
        hasMorePage: fetchData?.getMails?.pageInfo?.hasNextPage as boolean,
      };
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };

  return (
    <div data-cy="MailList" className={`mails-list ${className ?? ''}`}>
      <VirtualList
        initilizeHasPage={hasNextPage}
        initilaizedData={results}
        deferredMeasurementCache={cache}
        rowHeight={({ index }: { index: any }) =>
          results[index]?.attachments?.filter((attachment: any) => !attachment.isInline)?.length
            ? !!actions?.length
              ? 90
              : 72
            : !!actions?.length
            ? 90
            : 72
        }
        getMoreRows={(indexRange: any) => loadMoreRows() as any}
        CustomRowRenderer={({ index, style, item }: { index: any; style: any; item: any }) => {
          const mailError = mailsErrors.find(({ id }) => id === item.messageId);
          return (
            <StyledMail
              key={item.messageId + 'MailList'}
              dataCy={`${index}`}
              style={{ direction: styleDirection }}
              mail={item}
              className={additionalMailClassName}
              onSelectMail={onSelectMail}
              searchTerm={(searchTerms as any)?.freeText}
              searchTerms={searchTerms}
              semanticColors={semanticColors}
              errorMessage={mailError?.errorMessage ? `Error creating task: ${mailError.errorMessage}` : undefined}
              parentHeight={style?.height as any}
              color={palette.black}
              isDisabled={false}
              actions={actions}
              attachmentsLimit={mailAttachmentsLimit}
              background={mailBackground}
              onMailClick={onMailClick}
            />
          );
        }}
      />
    </div>
  );
}

export default MailList;
