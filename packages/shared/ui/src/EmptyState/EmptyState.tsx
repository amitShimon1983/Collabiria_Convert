import React from 'react';
import styled from 'styled-components';
import { Text } from 'office-ui-fabric-react';

const Root = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  opacity: 0.42;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = ({
  isDefaultTheme,
  className,
  withoutImage,
  message = 'No results were found',
}: {
  isDefaultTheme?: boolean;
  className?: string;
  withoutImage?: boolean;
  message?: string;
}) => {
  return (
    <Root className={className}>
      <Content>
        {!withoutImage && (
          <img
            src={
              isDefaultTheme
                ? 'https://static-teammate.azureedge.net/static/noResults-dark.svg'
                : 'https://static-teammate.azureedge.net/static/noResults.svg'
            }
            alt="No results were found"
          />
        )}
        <Text>{message}</Text>
      </Content>
    </Root>
  );
};

export default EmptyState;
