import React, { useState, useCallback } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import classes from './MainPage.module.scss';
import { autoCompleteUtils, Spinner, Text, Toggle, PanelType, MailSearch } from '@harmonie/ui';
import SidePane from '../SidePane';
import MailList from '../MailList';
import { theme, useCustomizations, useDeviceContext, useQuery, useSsrLocalStorage } from '@harmonie/services';
import { GET_MAILS_QUERY } from '../MailList/config';
import { utils } from '@harmonie/services';

const cache = new CellMeasurerCache({
  fixedWidth: false,
  fixedHeight: true,
  defaultHeight: 100,
});

const searchScopes = [
  {
    key: 0,
    text: 'Current Folder',
    hint: 'Search current folder',
  },
  {
    key: 1,
    text: 'All Mailbox',
    hint: 'Search mailbox',
  },
];
interface MainPageProps {
  onSelectMail: any;
  selectedMail: any;
}
const MainPage = ({ onSelectMail, selectedMail }: MainPageProps) => {
  const { customizations, sementicColors } = useCustomizations();
  const { isMobile } = useDeviceContext();
  const [onlyRead, setOnlyRead] = useSsrLocalStorage('onlyRead', false);
  const [searchOptions, onSearch] = useState({ searchString: '', scope: 0 });
  const [selectedFolder, setSelectedFolder] = useState({
    displayName: 'Inbox',
    path: 'Inbox',
    id: 'inbox',
  });

  const toggleRead = useCallback(
    value => {
      setOnlyRead(value);
    },
    [setOnlyRead]
  );

  const terms = searchOptions.searchString
    ? autoCompleteUtils.stringToTerms(searchOptions.searchString)
    : { freeText: '' };
  const onSearchOptionsUpdate = useCallback(({ searchTerm, scope, terms }) => {
    debugger;
    const payload = {
      searchString: terms?.freeText ? terms.freeText : searchTerm,
      scope,
    };
    onSearch(payload);
  }, []);

  const { searchString, scope } = searchOptions;
  const showOnlyFocused = scope === 0 && selectedFolder && selectedFolder.id === 'inbox';
  const onSelectFolder = useCallback(
    folder => {
      setSelectedFolder(folder);
    },
    [setSelectedFolder]
  );
  const {
    loading,
    error,
    data: emails,
    fetchMore,
  } = useQuery(GET_MAILS_QUERY, {
    variables: {
      onlyRead: onlyRead(),
      searchTerm: searchString ?? '',
      scope: scope === 1 && searchString ? '' : selectedFolder?.id,
    },
  });

  const updateQuery = (prev: any, { fetchMoreResult }: { fetchMoreResult: any }) => {
    if (!fetchMoreResult) return prev;
    const prevMails = prev.getMails;
    const nextMails = fetchMoreResult.getMails;
    return {
      getMails: {
        results: [...prevMails.results, ...utils.filterFocused(nextMails.results)],
        pageInfo: nextMails.pageInfo,
        __typename: prevMails.__typename,
      },
    };
  };

  return (
    <>
      <div className={`${classes['MainPage']} ${selectedMail && classes['inactive']}`}>
        <div className={classes.top}>
          <SidePane
            iconName={''}
            className={''}
            collapseButtonColor={'red'}
            type={PanelType.smallFixedFar}
            onSelectFolder={onSelectFolder}
            selectedFolder={selectedFolder}
            externalStyle={{}}
          />
          <div className={classes['list']}>
            <Text>{searchString ? 'Search Results' : selectedFolder.path}</Text>
            <MailSearch
              isMobile={isMobile}
              styles={{ root: { borderBottom: '3px solid #6264a7' } }}
              onSearch={onSearchOptionsUpdate}
              searchScopes={searchScopes}
              selectedFolder={selectedFolder}
              className=""
            />
            {!loading && (
              <MailList
                cache={cache}
                showOnlyFocused={showOnlyFocused}
                searchTerm={terms?.freeText}
                searchTerms={terms}
                onSelectMail={onSelectMail}
                theme={customizations?.settings?.theme}
                semanticColors={sementicColors}
                loading={loading}
                error={error as any}
                data={emails?.getMails}
                fetchMore={fetchMore}
                updateQuery={updateQuery}
                additionalMailClassName={'overrideMailCss'}
              />
            )}
            {loading && <Spinner label={'Loading...'} />}
          </div>
        </div>

        <div className={classes['footer']}>
          <Toggle
            checked={onlyRead()}
            label="Show only read emails"
            inlineLabel
            onChange={() => toggleRead(!onlyRead())}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
