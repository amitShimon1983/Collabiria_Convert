import { ICustomizations } from '@fluentui/react';
import React, { createContext, useContext } from 'react';

const CustomizationsContext = createContext({
  customizations: {} as ICustomizations,
  sementicColors: {} as any,
});
export const CustomizationsContextProvider = CustomizationsContext.Provider;
export const useCustomizations = () => useContext(CustomizationsContext);
