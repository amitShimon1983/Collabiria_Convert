import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, Stack, Text } from '@harmonie/ui';

const fadeInRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 40%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0); 
  }
`;

const Root = styled(Stack)`
  background-color: ${({ theme: { palette } }) => palette.themeLighter};
  height: 100%;
  width: 160px;
  padding: 16px;
`;

const StackItem = styled(Stack.Item)`
  color: white;
  padding: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  width: 100px;
  cursor: pointer;
  animation-name: ${fadeInRight};
  animation-duration: 0.175s;
`;

const TeamsStack = ({
  items = [],
  value,
  onClick,
  onCreate,
}: {
  items?: any[];
  value?: string;
  onClick: (teamObjectId: string) => void;
  onCreate: () => void;
}) => {
  return (
    <Root tokens={{ childrenGap: 16 }}>
      <StackItem align="start">
        <Button iconProps={{ iconName: 'Add' }} onClick={onCreate} style={{ width: 100 }}></Button>
      </StackItem>
      {items.map(({ name, _id }) => (
        <StackItem align="start" key={_id}>
          <Button primary={value === _id} onClick={() => onClick(_id)}>
            <Text clip>{name}</Text>
          </Button>
        </StackItem>
      ))}
    </Root>
  );
};

export default TeamsStack;
