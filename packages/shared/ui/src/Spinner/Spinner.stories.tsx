import React from 'react';
import { Meta, Story } from '@storybook/react';
import Spinner from './Spinner';
import { ISpinnerProps, IStackProps, Label, Stack, SpinnerSize } from '@fluentui/react';

export const Template: Story<ISpinnerProps> = () => {
  const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };
  const tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };
  return (
    <Stack tokens={tokens.sectionStack}>
      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Extra small spinner</Label>
        <Spinner size={SpinnerSize.xSmall} />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Small spinner</Label>
        <Spinner size={SpinnerSize.small} />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Medium spinner</Label>
        <Spinner size={SpinnerSize.medium} />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Large spinner</Label>
        <Spinner size={SpinnerSize.large} />
      </Stack>
      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Spinner with label positioned below</Label>
        <Spinner label="I am definitely loading..." />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Spinner with label positioned above</Label>
        <Spinner label="Seriously, still loading..." ariaLive="assertive" labelPosition="top" />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Spinner with label positioned to right</Label>
        <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" />
      </Stack>

      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Spinner with label positioned to left</Label>
        <Spinner label="Nope, still loading..." ariaLive="assertive" labelPosition="left" />
      </Stack>
    </Stack>
  );
};

export default {
  title: 'Components/Spinner',
  parameters: {
    layout: 'padded',
  },
} as Meta;
