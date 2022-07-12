import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import './MailSearch.scss';
import { getTheme } from '@uifabric/styling';

import { mixpanelEvent } from '@harmonie/services';
import Autocomplete from '../Autocomplete/Autocomplete';

const getDropdownStyles = () => {
  const theme = getTheme();
  const { palette } = theme;
  return {
    dropdown: { width: 128 },
    root: {
      border: 'none',
    },
    title: {
      border: 'none',
      backgroundColor: palette.neutralLight,
    },
  };
};

function getMobileScope(selectedFolder) {
  return selectedFolder.id === 'inbox' || selectedFolder.wellKnownName === 'inbox' ? 1 : 0;
}

export function MailSearch({ onSearch, searchScopes, selectedFolder, className, styles, isMobile }) {
  const [searchScopeKey, setSearchScopeKey] = useState(isMobile ? getMobileScope(selectedFolder) : 0);
  //default scope for mobile
  useEffect(() => {
    if (isMobile) {
      const mobileScope = getMobileScope(selectedFolder);
      if (mobileScope !== searchScopeKey) {
        setSearchScopeKey(mobileScope);
      }
    }
  }, [isMobile, selectedFolder, searchScopeKey, setSearchScopeKey]);

  const handleAutocompleteSearch = useCallback(
    values => {
      debugger
      onSearch({
        ...values,
        scope: searchScopeKey,
      });
      mixpanelEvent('Search Email', { values });
    },
    [onSearch, searchScopeKey, searchScopes]
  );

  const handleAutocompleteClear = useCallback(() => {
    onSearch({});
  }, [onSearch, searchScopeKey]);
  return (
    <div style={styles?.root || {}} className={`search-box-holder ${className}`}>
      <Dropdown
        placeholder="Select an option"
        options={searchScopes}
        styles={getDropdownStyles()}
        defaultSelectedKey={searchScopeKey}
        onChange={(_, { key }) => setSearchScopeKey(key)}
      />
      <Autocomplete
        placeholder="Search"
        className={className}
        onSearch={handleAutocompleteSearch}
        onClear={handleAutocompleteClear}
        selectedFolder={selectedFolder}
      />
    </div>
  );
}

