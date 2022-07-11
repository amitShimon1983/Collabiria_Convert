import React, { BaseSyntheticEvent, CSSProperties, useCallback, useState } from 'react';
import { Box } from '../Box';
import OptionItem from './OptionsItem';

export interface Recipient {
  address: string;
  name?: string;
  profileImageUrl?: string;
}

export interface RecipientsListProps {
  items: Recipient[];
  defaultSelectedKey: string;
  search?: string;
  onClick: (recipient: Recipient, e: BaseSyntheticEvent) => void;
  style?: CSSProperties;
}

const RecipientsList = ({ items, defaultSelectedKey, search, onClick, style }: RecipientsListProps) => {
  const [selectedKey, setSelectedKey] = useState<string>(defaultSelectedKey);

  const onOptionClick = useCallback((recipient: Recipient, e: BaseSyntheticEvent) => {
    onClick(recipient, e);
    setSelectedKey(recipient.address);
  }, []);

  return (
    <>
      <Box asColumn style={style}>
        {items.length ? (
          items.map((recipient: Recipient) => (
            <OptionItem
              key={recipient.address}
              recipient={recipient}
              selected={recipient.address === selectedKey}
              onClick={(e: BaseSyntheticEvent) => onOptionClick(recipient, e)}
              search={search}
            />
          ))
        ) : (
          <Box padding="md">No results were found</Box>
        )}
      </Box>
    </>
  );
};

export default RecipientsList;
