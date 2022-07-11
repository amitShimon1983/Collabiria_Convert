import React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react';
import { SuggestionItemLoadingStyle } from './AutompleteStyles';
import Spinner from '../Spinner/Spinner';

const SuggestionsList = ({ loading, items, children }) => {
  if (items.length === 0)
    return loading ? (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div style={SuggestionItemLoadingStyle()}>
          <Spinner label={"Searching..."} size={2} style={{ marginRight: 10 }} />
        </div>
      </FocusZone>
    ) : (
      ''
    );
  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div data-is-scrollable>
        <List id="SearchList" tabIndex={0} items={items} onRenderCell={(item, index) => children(item, index)} />
      </div>
    </FocusZone>
  );
};

export default SuggestionsList;
