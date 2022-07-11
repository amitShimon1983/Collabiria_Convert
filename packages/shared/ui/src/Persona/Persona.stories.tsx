import React from 'react';
import { IPersonaProps, Stack, PersonaPresence, PersonaSize, PersonaInitialsColor } from '@fluentui/react';
import { Story } from '@storybook/react';
import Persona from './Persona';

export const Template: Story<IPersonaProps> = (args: any) => {
  const { showUnknownPersonaCoin, presence, color } = args;

  return (
    <Stack tokens={{ childrenGap: 4 }}>
      <Persona {...args} size={PersonaSize.size8} search="Customizations" />
      <Persona
        {...args}
        size={PersonaSize.size24}
        search="Customizations"
        presence={PersonaPresence[presence]}
        initialsColor={PersonaInitialsColor[color]}
      />
      <Persona
        {...args}
        size={PersonaSize.size32}
        search="Customizations"
        presence={PersonaPresence[presence]}
        initialsColor={PersonaInitialsColor[color]}
      />
      <Persona
        {...args}
        size={PersonaSize.size40}
        search="Customizations"
        presence={PersonaPresence[presence]}
        initialsColor={PersonaInitialsColor[color]}
      />
      <Persona
        {...args}
        size={PersonaSize.size48}
        search="Customizations"
        presence={PersonaPresence[presence]}
        initialsColor={PersonaInitialsColor[color]}
      />
      <Persona
        {...args}
        size={PersonaSize.size56}
        search="Customizations"
        presence={PersonaPresence[presence]}
        initialsColor={PersonaInitialsColor[color]}
      />
      <Persona
        {...args}
        size={PersonaSize.size72}
        search="Customizations"
        imageUrl={
          !showUnknownPersonaCoin &&
          'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
        }
        presence={PersonaPresence[presence]}
      />
      <Persona
        {...args}
        size={PersonaSize.size100}
        search="Customizations"
        imageUrl={
          !showUnknownPersonaCoin &&
          'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
        }
        presence={PersonaPresence[presence]}
      />
      <Persona
        {...args}
        size={PersonaSize.size120}
        search="Customizations"
        imageUrl={
          !showUnknownPersonaCoin &&
          'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
        }
        presence={PersonaPresence[presence]}
      />
      <Persona
        {...args}
        size={PersonaSize.size120}
        search="Customizations"
        imageUrl={
          !showUnknownPersonaCoin &&
          'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png'
        }
        presence={PersonaPresence[presence]}
        showUnknownPersonaCoin={true}
      />
    </Stack>
  );
};

export default {
  title: 'Components/Persona',
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'text',
        'secondaryText',
        'tertiaryText',
        'hidePersonaDetails',
        'showUnknownPersonaCoin',
        'presence',
        'isOutOfOffice',
        'color',
      ],
    },
  },
  argTypes: {
    text: {
      defaultValue: 'text',
      control: { type: 'text' },
    },
    secondaryText: {
      defaultValue: 'secondaryText',
      control: { type: 'text' },
    },
    tertiaryText: {
      defaultValue: 'tertiaryText',
      control: { type: 'text' },
    },
    hidePersonaDetails: {
      defaultValue: false,
      control: { type: 'boolean' },
    },

    showUnknownPersonaCoin: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    presence: {
      defaultValue: 'none',
      control: 'select',
      options: ['none', 'offline', 'online', 'away', 'dnd', 'blocked', 'busy'],
    },
    color: {
      defaultValue: 'none',
      control: 'select',
      options: [
        'lightBlue',
        'blue',
        'darkBlue',
        'teal',
        'lightGreen',
        'green',
        'darkGreen',
        'lightPink',
        'pink',
        'magenta',
        'purple',
        'black',
        'orange',
        'red',
        'darkRed',
        'transparent',
      ],
    },
    isOutOfOffice: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};
