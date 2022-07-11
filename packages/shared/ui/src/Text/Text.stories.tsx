import React from 'react';
import { Stack } from '@fluentui/react';
import { Story } from '@storybook/react';
import { theme } from '@harmon.ie/collabria-frontend-shared';
import Text, { TextProps, H1, H2, H3, H4, H5, H6 } from './Text';
import { getCustomizations } from '@harmon.ie/collabria-frontend-shared/src/services/theme/theme';

export const Template: Story<TextProps> = (args: any) => {
  const {
    settings: {
      theme: { fonts },
    },
  } = theme.getCustomizations();

  return (
    <Stack tokens={{ childrenGap: 4 }}>
      {Object.keys(fonts).map((key: string) => (
        <Text level={key} {...args}>
          {key}: Almost before we knew it
        </Text>
      ))}
      <H1 {...args}>H1: Almost before we knew it</H1>
      <H2 {...args}>H2: Almost before we knew it</H2>
      <H3 {...args}>H3: Almost before we knew it</H3>
      <H4 {...args}>H4: Almost before we knew it</H4>
      <H5 {...args}>H5: Almost before we knew it</H5>
      <H6 {...args}>H6: Almost before we knew it</H6>
    </Stack>
  );
};

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    controls: { include: ['bold', 'color'] },
  },
  argTypes: {
    bold: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },
    color: {
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};
