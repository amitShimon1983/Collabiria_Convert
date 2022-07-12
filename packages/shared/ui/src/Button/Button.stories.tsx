import React, { SyntheticEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  Stack,
  CompoundButton,
  CommandBarButton,
  IContextualMenuProps,
  DefaultButton,
  ActionButton,
} from '@fluentui/react';
import Button, { ButtonProps } from './Button';

const Buttons = (props: any) => (
  <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
    <Button {...props}>Default</Button>
    <Button {...props} iconProps={{ iconName: 'Add' }}>
      Default
    </Button>
    <Button {...props} disabled>
      Disabled
    </Button>
    <Button {...props} checked>
      Checked
    </Button>
    <Button {...props} loading>
      Loading
    </Button>
    <Button {...props} loading disabled>
      Loading (disabled)
    </Button>
    <Button {...props} loading checked>
      Loading (checked)
    </Button>
  </Stack>
);

const CompoundButtons = (props: any) => (
  <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
    <CompoundButton {...props} secondaryText="This is the secondary text.">
      Default
    </CompoundButton>
    <CompoundButton {...props} secondaryText="This is the secondary text." iconProps={{ iconName: 'Add' }}>
      Default
    </CompoundButton>
    <CompoundButton {...props} secondaryText="This is the secondary text." disabled>
      Disabled
    </CompoundButton>
    <CompoundButton {...props} secondaryText="This is the secondary text." checked>
      Checked
    </CompoundButton>
  </Stack>
);

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
};

const CommandBarButtons = (props: any) => (
  <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
    <CommandBarButton {...props} text="Default" menuProps={menuProps} />
    <CommandBarButton {...props} text="Default" menuProps={menuProps} iconProps={{ iconName: 'Add' }} />
    <CommandBarButton {...props} text="Disabled" menuProps={menuProps} disabled />
    <CommandBarButton {...props} text="Checked" menuProps={menuProps} checked />
  </Stack>
);

const SplitButtons = (props: any) => (
  <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
    <DefaultButton {...props} text="Default" split menuProps={menuProps} />
    <DefaultButton {...props} text="Default" split menuProps={menuProps} iconProps={{ iconName: 'Add' }} />
    <DefaultButton {...props} text="Disabled" split menuProps={menuProps} disabled />
    <DefaultButton {...props} text="Checked" split menuProps={menuProps} checked />
  </Stack>
);

const ActionButtons = (props: any) => (
  <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
    <ActionButton {...props}>Default</ActionButton>
    <ActionButton {...props} iconProps={{ iconName: 'Add' }}>
      Default
    </ActionButton>
    <ActionButton {...props} disabled>
      Disabled
    </ActionButton>
    <ActionButton {...props} checked>
      Checked
    </ActionButton>
  </Stack>
);

export const Template: Story<ButtonProps> = args => (
  <>
    <h3>Default Button</h3>
    <Buttons {...args} />
    <br />
    <Buttons {...args} primary />
    <br />
    <h3>Compound Button</h3>
    <CompoundButtons {...args} />
    <br />
    <CompoundButtons {...args} primary />
    <br />
    <h3>CommandBar Buttons</h3>
    <CommandBarButtons {...args} />
    <br />
    <h3>Split Buttons</h3>
    <SplitButtons {...args} onClick={(e: SyntheticEvent) => console.log(e)} />
    <br />
    <SplitButtons {...args} primary onClick={(e: SyntheticEvent) => console.log(e)} />
    <br />
    <h3>Command Buttons</h3>
    <SplitButtons {...args} />
    <br />
    <SplitButtons {...args} primary />
    <br />
    <h3>Action Buttons</h3>
    <ActionButtons {...args} />
    <br />
  </>
);

export default {
  title: 'Components/Button',
  parameters: {
    layout: 'padded',
  },
} as Meta;
