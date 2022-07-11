export const isNumber = (value: any) => typeof value === 'number';
export function inIframe() {
  try {
    return window?.self !== window?.top;
  } catch (e) {
    return true;
  }
}
export function humanFileSize(bytes: number, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return `${bytes.toFixed(dp)} ${units[u]}`;
}

export const setDate = (value: any) => {
  const date = new Date(value);
  date.setDate(date.getDate());

  return `${date
    .toLocaleString('default', {
      day: 'numeric',
      month: 'numeric',
      weekday: 'short',
    })
    .replace(',', '')} ${date.toLocaleTimeString()}`;
};

export const times = (n: number, func = (i: number) => i) => Array.from({ length: n }).map((_, i) => func(i));

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

export function getFileExtension(filename: string) {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext === null ? '' : ext[1];
}

export const filterFocused = (results: { [key: string]: any }[]) => {
  return results?.filter?.(
    ({ inferenceClassification }) => !inferenceClassification || inferenceClassification === 'focused'
  );
};

export function getRelativeDisplayDate(date: Date) {
  const now = new Date();

  // Today -> 5:23 PM
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (date >= today) {
    return date.toLocaleString('default', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  // This week -> Sun 3:04 PM
  const sunday = new Date(today);
  sunday.setDate(now.getDate() - now.getDay());
  if (date >= sunday) {
    return date.toLocaleString('default', {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'short',
    });
  }

  // Last two week -> Sun 8/2
  const lastTwoWeeks = new Date(sunday);
  lastTwoWeeks.setDate(sunday.getDate() - 7);
  if (date >= lastTwoWeeks) {
    return date.toLocaleString('default', {
      day: 'numeric',
      month: 'numeric',
      weekday: 'short',
    });
  }

  // More than two weeks ago -> 8/1/2020
  return date.toLocaleString('default', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
