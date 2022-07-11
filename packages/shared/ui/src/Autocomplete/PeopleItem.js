import React, { useCallback } from 'react';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from '@fluentui/react';
import { PersonaSize } from 'office-ui-fabric-react';
import { classNames, SuggestionItemStyle, SuggestionListStyle } from './AutompleteStyles';
import Persona from '../Persona/Persona';

const PeopleItem = ({ item, onClick, searchValue, searchTerm }) => {
  const { name, address } = item;

  const onItemClick = () => {
    onClick(item);
  };

  const onKeyDown = useCallback(
    ev => {
      if (ev.which === KeyCodes.enter) {
        onItemClick();
      }
    },
    [onClick, item]
  );

  return (
    <div
      style={SuggestionItemStyle()}
      key={item.key}
      onClick={onItemClick}
      onKeyDown={onKeyDown}
      className={classNames().itemCell}
      data-is-focusable={true}
    >
      <React.Fragment>
        <div id={`link${address}`} style={SuggestionListStyle()}>
          <TooltipHost content={name || address}>
            <Persona
              emailAddress={address}
              fullName={name}
              secondaryText={`${searchTerm}: ${address}`}
              size={PersonaSize.size32}
              searchTerm={searchValue}
              matchBold={true}
              showSecondaryText={true}
            />
          </TooltipHost>
        </div>
      </React.Fragment>
    </div>
  );
};

export default PeopleItem;
