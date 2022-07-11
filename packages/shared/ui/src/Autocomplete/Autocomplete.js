import React, { useState, useCallback, useEffect } from 'react';
import { SearchBox, KeyCodes } from 'office-ui-fabric-react';
import { useLocalStorage } from '@rehooks/local-storage';
import { mixpanelEvent, usePeopleSearch } from '@harmonie/services';
import { AutocompleteStyles, SearchBoxStyle } from './AutompleteStyles';
import SuggestionsContainer from './SuggestionsContainer';
import SuggestionsList from './SuggestionsList';
import PeopleItem from './PeopleItem';
import SavedSearchItem from './SavedSearchItem';
import { stringToTerms, termsToString, encodeString } from './utils';

const containerRef = React.createRef();
let searchBoxRef = React.createRef();

function Autocomplete({ placeholder, onSearch, onClear, selectedFolder, className }) {
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [terms, setTerms] = useState({});
  const [valueToSearch, setValueToSearch] = useState({ value: '', term: '' });
  const [savedSearches, setSavedSearches] = useLocalStorage('saved-pool-searches', []);

  const { loading, people } = usePeopleSearch(valueToSearch.value);
  const handleClear = useCallback(() => {
    onClear();
    setSearchTerm('');
    setTerms({});
    setValueToSearch({ value: '', term: '' });
  }, [onClear]);

  useEffect(() => handleClear(), [selectedFolder.id]);

  const addSavedSearch = useCallback(
    searchItem => {
      if (!searchItem) {
        return;
      }
      const newItems = savedSearches.length >= 8 ? savedSearches.slice(0, -1) : savedSearches;
      const newItem = encodeString(searchItem);

      if (!newItems.includes(newItem)) {
        setSavedSearches([newItem, ...newItems]);
      }
    },
    [savedSearches, setSavedSearches]
  );

  const onSearchClick = useCallback(
    searchString => {
      setSearchTerm(searchString);
      const newTerms = stringToTerms(searchString);
      setTerms(newTerms);
      addSavedSearch(searchString);
      setValueToSearch({ value: '', term: '' });
      onSearch({
        searchTerm: searchString,
        terms: newTerms,
      });
    },
    [terms, searchTerm]
  );

  const onKeyDown = ev => {
    if (ev.which === KeyCodes.down) {
      let el = window.document.querySelector('#SearchList');
      if (el) el.focus();
    }
  };

  const onChange = useCallback(
    (event, value) => {
      const parsedTerms = stringToTerms(value);
      const from = parsedTerms.from !== undefined && parsedTerms.from !== terms.from ? parsedTerms.from : '';
      const to = parsedTerms.to !== undefined && parsedTerms.to !== terms.to ? parsedTerms.to : '';
      setValueToSearch({
        value: from || to,
        term: from ? 'from' : to ? 'to' : '',
      });
      setTerms(parsedTerms);
      setSearchTerm(value);
    },
    [terms]
  );

  const selectEnd = useCallback(() => {
    const input = searchBoxRef._inputElement.current;
    input.focus();
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }, [searchBoxRef]);

  const onSuggestionsListClick = useCallback(
    item => {
      const newTerms = {
        ...terms,
        [valueToSearch.term]: item.address,
      };
      onSearchClick(termsToString(newTerms));
      setValueToSearch({ value: '', term: '' });
      selectEnd();
      mixpanelEvent('Search Suggestion clicked', { isPeople: !!item.isPeople });
    },
    [terms, selectEnd]
  );

  const onSavedSearchListClick = useCallback(
    savedSearch => {
      selectEnd();
      onSearchClick(savedSearch);
    },
    [selectEnd]
  );

  const onSearchBoxFocus = useCallback(() => {
    setShowSavedSearches(true);
  }, []);

  const autoCompleteWidth = containerRef ? containerRef?.current?.offsetWidth : 523;

  return (
    <div className={className} ref={containerRef} onKeyDown={onKeyDown} style={AutocompleteStyles()}>
      <form action=".">
        <SearchBox
          componentRef={ref => (searchBoxRef = ref)}
          styles={SearchBoxStyle}
          id={'SuggestionSearchBox'}
          autoComplete="off"
          role="search"
          placeholder={placeholder}
          onSearch={onSearchClick}
          onClear={handleClear}
          onChange={onChange}
          onFocus={onSearchBoxFocus}
          value={searchTerm ? searchTerm : null}
          className={className}
        />
      </form>
      <SuggestionsContainer hidden={!valueToSearch.value} width={autoCompleteWidth} ref={containerRef}>
        <SuggestionsList loading={loading} items={(!loading && people) || []}>
          {item => (
            <PeopleItem
              item={item}
              onClick={onSuggestionsListClick}
              searchTerm={valueToSearch.term}
              searchValue={valueToSearch.value}
            />
          )}
        </SuggestionsList>
      </SuggestionsContainer>

      <SuggestionsContainer
        hidden={!showSavedSearches || !!searchTerm}
        width={autoCompleteWidth}
        ref={containerRef}
        onDismiss={() => setShowSavedSearches(false)}
      >
        <SuggestionsList items={savedSearches || []}>
          {(item, index) => (
            <SavedSearchItem key={`SavedSearchItem-${index}`} item={item} onClick={onSavedSearchListClick} />
          )}
        </SuggestionsList>
      </SuggestionsContainer>
    </div>
  );
}

export default Autocomplete;
