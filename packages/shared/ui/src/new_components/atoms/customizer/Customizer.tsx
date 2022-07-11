import React, { FunctionComponent } from 'react';
import { Customizer as ExternalCustomizer } from '@fluentui/react';

interface CustomizerProps {
  themeName?: string;
  customizations: any;
}
//need to change import to ThemeProvider from version 8
const Customizer: FunctionComponent<CustomizerProps> = ({ children, customizations }) => {
  return <ExternalCustomizer {...customizations}>{children}</ExternalCustomizer>;
};

export default Customizer;
