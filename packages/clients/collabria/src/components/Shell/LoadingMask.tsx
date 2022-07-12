import React from 'react';
import { Stack, Spinner } from '@harmonie/ui';

const LoadingMask = () => {
  return (
    <Stack verticalFill horizontalAlign="center" verticalAlign="center">
      <Stack.Item align="center">
        <Spinner label="Loading..." />
      </Stack.Item>
    </Stack>
  );
};

export default LoadingMask;
