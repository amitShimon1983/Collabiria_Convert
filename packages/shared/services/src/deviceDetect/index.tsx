import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
import React, { useContext } from 'react';
const DeviceContext = React.createContext({ isMobile, isTablet, isAndroid, isIOS });
export const DeviceContextProvider = DeviceContext.Provider;
export const useDeviceContext = () => useContext(DeviceContext);
export default DeviceContext;
