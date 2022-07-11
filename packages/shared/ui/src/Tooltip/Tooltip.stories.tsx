import React from 'react';
import { ITooltipHostProps, ITooltipProps, Stack, DirectionalHint, DefaultButton } from '@fluentui/react';
import { Story } from '@storybook/react';
import Tooltip from './Tooltip';

export const Template: Story<ITooltipHostProps> = (args: any) => {
  const tooltipProps: ITooltipProps = {
    onRenderContent: () => (
      <>
        <h2>Tooltip with custom content</h2>
        <ul style={{ margin: 10, padding: 0 }}>
          <li>1. One</li>
          <li>2. Two</li>
        </ul>
      </>
    ),
  };
  return (
    <Stack tokens={{ childrenGap: 10 }}  >
      <Stack.Item align={'center'}>
        <Tooltip
          {...args}
          content="This is the tooltip on top"
          id="tooltipId"
          calloutProps={{ gapSpace: 0 }}
          styles={{ root: { display: 'inline-block' } }}
          directionalHint={DirectionalHint.topCenter}
        >
          <DefaultButton aria-describedby={'tooltipId'}>Hover over me</DefaultButton>
        </Tooltip>
      </Stack.Item>
      <Stack.Item align={'center'}>
        <Tooltip
          {...args}
          content="This is the tooltip on bottom"
          id="tooltipId"
          calloutProps={{ gapSpace: 0 }}
          styles={{ root: { display: 'inline-block' } }}
          directionalHint={DirectionalHint.bottomCenter}
        >
          <DefaultButton aria-describedby={'tooltipId'}>Hover over me</DefaultButton>
        </Tooltip>
      </Stack.Item>

      <Stack.Item align={'center'}>
        <Tooltip
          {...args}
          content="This is the tooltip on right"
          id="tooltipId"
          calloutProps={{ gapSpace: 0 }}
          styles={{ root: { display: 'inline-block' } }}
          directionalHint={DirectionalHint.rightCenter}
        >
          <DefaultButton aria-describedby={'tooltipId'}>Hover over me</DefaultButton>
        </Tooltip>
      </Stack.Item>

      <Stack.Item align={'center'}>
        <Tooltip
          {...args}
          content="This is the tooltip on left"
          id="tooltipId"
          calloutProps={{ gapSpace: 0 }}
          styles={{ root: { display: 'inline-block' } }}
          directionalHint={DirectionalHint.leftCenter}
        >
          <DefaultButton aria-describedby={'tooltipId'}>Hover over me</DefaultButton>
        </Tooltip>
      </Stack.Item>

      <Tooltip {...args} tooltipProps={tooltipProps} content="This is the tooltip-3" id="tooltipId-3" />
    </Stack>
  );
};

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
    controls: { include: ['closeDelay'] },
  },
  argTypes: {
    closeDelay: {
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 1000, step: 100 },
    },
  },
};
