import React from 'react';
import { Stack } from '@fluentui/react';
import { Story } from '@storybook/react';
import Skeleton from './Skeleton';

export const Template: Story = (args: any) => {
  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ width: 300 }}>
      <Skeleton {...args} />
    </Stack>
  );
};

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    controls: { include: ['variant', 'animation', 'height', 'width'] },
  },
};
