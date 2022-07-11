import React from 'react';
import { Stack } from '@fluentui/react';
import Box, { BoxProps } from './Box';
import { Story } from '@storybook/react';

export const Template: Story<BoxProps> = (args: any) => (
  <Stack tokens={{ childrenGap: 10 }}>
    <Box {...args}>
      <Box {...args}>
        Button components can contain an Icon. This is done by setting the icon property or placing an Icon component
        within the Button. Button components can contain an Icon. This is done by setting the icon property or placing
        an Icon component within the Button. Button components can contain an Icon. This is done by setting the icon
        property or placing an Icon component within the Button.
      </Box>
      <Box {...args}>
        Button components can contain an Icon. This is done by setting the icon property or placing an Icon component
        within the Button. Button components can contain an Icon. This is done by setting the icon property or placing
        an Icon component within the Button. Button components can contain an Icon. This is done by setting the icon
        property or placing an Icon component within the Button.
      </Box>
      <Box {...args}>
        Button components can contain an Icon. This is done by setting the icon property or placing an Icon component
        within the Button. Button components can contain an Icon. This is done by setting the icon property or placing
        an Icon component within the Button. Button components can contain an Icon. This is done by setting the icon
        property or placing an Icon component within the Button.
      </Box>
    </Box>
  </Stack>
);

export default {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    controls: { include: ['asColumn', 'bordered', 'shadow', 'reversed', 'radius', 'margin', 'padding'] },
  },
  argTypes: {
    asColumn: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },
    bordered: {
      defaultValue: true,
      control: { type: 'inline-radio', options: [false, true] },
    },
    shadow: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },

    reversed: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },

    radius: {
      defaultValue: 'xxs',
      control: { type: 'inline-radio', options: ['', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    },
    margin: {
      defaultValue: 'md',
      control: { type: 'inline-radio', options: ['', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    },
    padding: {
      defaultValue: 'md',
      control: { type: 'inline-radio', options: ['', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    },
  },
};
