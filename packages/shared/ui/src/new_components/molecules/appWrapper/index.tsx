import React, { FunctionComponent, useEffect, useState } from 'react';
import { Customizer, StyledThemeProvider, StoreProvider, AppThemeProvider } from '../../../new_components';
import { DeviceContextProvider, theme } from '@harmonie/services';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
interface AppProviderProps {
  appConfig: { [key: string]: any };
  themeName?: string;
  needToRefresh: boolean;
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({ children, appConfig, themeName, needToRefresh }) => {
  const [customizations, setCustomizations] = useState<any>();
  useEffect(() => {
    const ctx = theme.getCustomizations(themeName);
    if (ctx) {
      setCustomizations(ctx);
    }
  }, []);
  return (
    <StoreProvider appConfig={appConfig} needToRefresh={needToRefresh}>
      <Customizer themeName={themeName} customizations={customizations}>
        <StyledThemeProvider customizations={customizations}>
          <AppThemeProvider customizations={customizations}>
            <DeviceContextProvider value={{ isMobile, isTablet, isAndroid, isIOS }}>{children}</DeviceContextProvider>
          </AppThemeProvider>
        </StyledThemeProvider>
      </Customizer>
    </StoreProvider>
  );
};

export default AppProvider;
