import React from 'react';
import {merge} from 'lodash';
import {ThemeProvider} from 'styled-components';
import {Customizer, Fabric} from '@fluentui/react';
import { getCustomizations } from '@harmonie/services';

export const decorators = [
  Story => {
    const customizations = merge({}, getCustomizations(), {
      settings: {theme: {name: 'default'}},
    });

    return (
      <Customizer>
        <Fabric>
          <ThemeProvider theme={customizations.settings.theme}>
            <Story/>
          </ThemeProvider>
        </Fabric>
      </Customizer>
    );
  },
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'centered',
};
