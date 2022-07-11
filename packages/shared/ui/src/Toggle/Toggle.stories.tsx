import React from 'react';
import { Meta, Story } from '@storybook/react';
import Toggle from './Toggle';
import { IToggleProps, Stack } from '@fluentui/react';

export const Template: Story<IToggleProps> = () => (
  <Stack tokens={{ childrenGap: 10 }}>
    <Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" />
    <Toggle label="Enabled and unchecked" onText="On" offText="Off" />
    <Toggle label="Disabled and checked" defaultChecked disabled onText="On" offText="Off" />
    <Toggle label="Disabled and unchecked" disabled onText="On" offText="Off" />
    <Toggle label="With inline label" inlineLabel onText="On" offText="Off" />
    <Toggle label="Disabled with inline label" inlineLabel disabled onText="On" offText="Off" />
  </Stack>
);

export default {
  title: 'Components/Toggle',
  parameters: {
    layout: 'padded',
  },
} as Meta;
