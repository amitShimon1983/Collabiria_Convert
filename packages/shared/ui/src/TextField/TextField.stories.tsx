import React from 'react';
import { ITextFieldProps } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { Story } from '@storybook/react';
import TextField from './TextField';
const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const Template: Story<ITextFieldProps> = (args: any) => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField {...args} label="Standard" />
        <TextField {...args} label="Disabled" disabled defaultValue="I am disabled" />
        <TextField {...args} label="Read-only" readOnly defaultValue="I am read-only" />
        <TextField {...args} label="Required " required />
        <TextField {...args} ariaLabel="Required without visible label" required />
        <TextField {...args} label="With error message" errorMessage="Error message" />
      </Stack>
      <Stack {...columnProps}>
        <TextField {...args} label="With an icon" iconProps={iconProps} />
        <TextField {...args} label="With placeholder" placeholder="Please enter text here" />
        <TextField {...args} label="Disabled with placeholder" disabled placeholder="I am disabled" />
        <TextField
          {...args}
          label="Password with reveal button"
          type="password"
          canRevealPassword
          revealPasswordAriaLabel="Show password"
        />
      </Stack>
    </Stack>
  );
};

export default {
  title: 'Components/TextField',
  parameters: {
    layout: 'padded',
    controls: {
      include: ['readOnly', 'required', 'disabled', 'multiline', 'resizable', 'underlined'],
    },
  },
  argTypes: {
    readOnly: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    required: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    multiline: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    resizable: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    underlined: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};
