import React, { FunctionComponent } from 'react';
import { ThemeProvider as ExternalThemeProvider } from 'styled-components';
interface StyledThemeProviderProps {
  customizations: any;
}
const StyledThemeProvider: FunctionComponent<StyledThemeProviderProps> = ({ children, customizations }) => {
  return (
    <ExternalThemeProvider theme={customizations?.settings?.theme ? customizations?.settings?.theme : {}}>
      {children}
    </ExternalThemeProvider>
  );
};

export default StyledThemeProvider;
