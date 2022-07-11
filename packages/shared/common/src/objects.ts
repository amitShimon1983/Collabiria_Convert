export const get = (value: any, path: string, defaultValue = null) => {
  return String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        acc = acc[v] !== undefined && acc[v] !== null ? acc[v] : defaultValue;
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, value);
};
