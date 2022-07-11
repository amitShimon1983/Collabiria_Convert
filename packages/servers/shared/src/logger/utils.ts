const isProduction = process?.env?.NODE_ENV === 'production';

const INFO = 30;
const WARN = 40;
const ERROR = 50;
const FATAL = 60;

export const convertLevelToAzureSeverity = (level: number): number => {
  switch (level) {
    case INFO:
      return 1;
    case WARN:
      return 2;
    case ERROR:
      return 3;
    case FATAL:
      return 4;
    default:
      return 0;
  }
};

export const convertLevelToConsoleSeverity = (level: number): string => {
  if (level === 30) {
    return 'INFO';
  } else if (level === 40) {
    return 'WARN';
  } else if (level === 50) {
    return 'ERROR';
  } else {
    return 'FATAL';
  }
};

export const isEmpty = (obj: any) => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const consoleColors: any = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  crimson: '\x1b[38m',
};

export const getFgColor = (color: string) => {
  return isProduction ? '' : color === 'reset' ? consoleColors.reset : consoleColors[color];
};

export const getMessageColor = (level: number) => {
  if (isProduction) {
    return '';
  }
  if (level < 30) {
    return consoleColors.white;
  } else if (level < 40) {
    return consoleColors.blue;
  } else if (level < 50) {
    return consoleColors.yellow;
  } else {
    return consoleColors.red;
  }
};

export const pick = (obj: any, keys?: string[]) => {
  if (typeof obj === 'string') return obj;
  const subset = keys ? keys.filter((key: string) => key in obj) : Object.keys(obj);
  return subset.reduce((acc: any, key: string) => {
    const value = obj[key];
    if (value) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const omit = (obj: any, keys: string[]) => {
  const subset = Object.keys(obj).filter((key: string) => keys.indexOf(key) < 0);
  return subset.reduce((acc: any, key: string) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};
