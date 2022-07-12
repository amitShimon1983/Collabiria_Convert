import React from 'react';
import styled from 'styled-components';
import { getTheme } from '@uifabric/styling';
import { IconButton } from '@harmonie/ui';

const Root = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ErrorLabelWrapper = styled.div<{ background: string }>`
  background: ${({ background }) => background};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-left: 0;
`;

const ErrorLabel = styled.span<{ color: string }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: black;
`;

const buttonStyle = { color: 'red' };
const ErrorBadge = ({
  showError,
  className,
  dismissFunc,
  message,
}: {
  showError: boolean;
  message?: string;
  className?: string;
  dismissFunc?: any;
}) => {
  const { palette } = getTheme();
  const displayMessage = message && showError ? message : 'Something went wrong. Please try again later.';
  return (
    <Root
      className={className}
      onClick={evt => {
        evt.stopPropagation();
        dismissFunc(false);
      }}
    >
      <ErrorLabelWrapper background={'#FDE7E9'}>
        <IconButton iconProps={{ iconName: 'ErrorBadge' }} title="Error" ariaLabel="Error" />
        <ErrorLabel color={'#000000'}>{displayMessage}</ErrorLabel>
      </ErrorLabelWrapper>
    </Root>
  );
};

export default ErrorBadge;
