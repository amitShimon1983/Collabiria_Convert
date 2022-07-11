import React from 'react';
import styled from 'styled-components';
import { PersonaSize } from '@fluentui/react';
import { Persona } from '../Persona';
import { Box } from '../Box';

export const ItemWrapper = styled(Box)<{ selected?: boolean }>`
  cursor: pointer;
  min-height: 50px;

  &:hover {
    background-color: rgb(234, 234, 234);
  }

  ${({ selected }) => (selected ? `background-color: rgb(234, 234, 234)` : '')}
`;

const OptionItem = ({ recipient, onClick, selected, search }: any) => (
  <ItemWrapper padding="0,md" onClick={() => onClick(recipient.address)} selected={selected}>
    <Persona
      key={recipient.address}
      text={recipient?.name.toString() || ''}
      secondaryText={recipient?.address.toString() || ''}
      size={PersonaSize.size32}
      search={search}
      showSecondaryText
      styles={{ root: { minHeight: 50, height: 50, width: '100%' } }}
      highlightStyle={{ fontWeight: 'bold' }}
    />
  </ItemWrapper>
);

export default OptionItem;
