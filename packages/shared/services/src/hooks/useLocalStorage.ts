import React, { Dispatch, useCallback, useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initialValue: any = ''): [() => any, Dispatch<any>] {
  const [value, setValue] = useState(() => window.localStorage.getItem(key) || JSON.stringify(initialValue));

  const setItem = (newValue: any) => {
    const valueAsString = JSON.stringify(newValue);
    setValue(valueAsString);
    window.localStorage.setItem(key, valueAsString);
  };

  const getItem = () => {
    try {
      if (value !== null && value !== undefined) {
        return typeof value === 'string' ? JSON.parse(value) : value;
      }
    } catch (error: any) {
      console.log(error.message);
    }
    return null;
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue(newValue || initialValue);
    }
  }, []);

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [getItem, setItem];
}
export const useSsrLocalStorage = (key: string, initial: any = ''): [() => any, React.Dispatch<any>] => {
  return typeof window === 'undefined' ? [() => initial, (value: any) => undefined] : useLocalStorage(key, initial);
};
