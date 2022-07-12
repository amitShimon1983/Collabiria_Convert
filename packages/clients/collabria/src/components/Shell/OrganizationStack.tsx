import React from 'react';
import styled from 'styled-components';
import { startCase, camelCase } from 'lodash';
import { Stack, Persona } from '@harmonie/ui';

const Root = styled(Stack)`
  background-color: ${({ theme: { palette } }) => palette.themePrimary};
  height: 100%;
  width: 60px;
  padding: 16px;
`;

const StackItem = styled(Stack.Item)<{ selected: boolean }>`
  color: white;
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme: { palette }, selected }) => (selected ? palette.themeDarker : palette.themeDarkAlt)};
  cursor: pointer;
`;

const OrganizationStack = ({
  items,
  value,
  onClick,
}: {
  items: any[];
  value?: string;
  onClick: (organizationObjectId: string) => void;
}) => {
  return (
    <Root horizontalAlign="center" tokens={{ childrenGap: 16 }}>
      {items.map(({ organization: { name, _id } }) => (
        <StackItem align="center" key={_id} onClick={() => onClick(_id)} selected={value === _id}>
          <Persona
            size={Persona.PersonaSize.size32}
            coinSize={32}
            text={startCase(camelCase(name))}
            initialsColor="transparent"
          />
        </StackItem>
      ))}
    </Root>
  );
};

export default OrganizationStack;
