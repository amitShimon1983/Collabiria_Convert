/* eslint-disable */
import { Writable } from 'stream';
import util from 'util';
import { convertLevelToConsoleSeverity, isEmpty, getMessageColor, getFgColor } from '../utils';

class ConsoleStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(entry: any, _encoding: string, done: () => void) {
    try {
      const { name, hostname, pid, level, time, err = {}, msg, message, v, ...properties } = entry;

      const messageFormat = msg || message || err?.message || '';
      const severity = convertLevelToConsoleSeverity(level);
      const props = {...properties, ...err };
      const data = isEmpty(props) ? '' : props;

      const args = [
        getFgColor('green'),
        `[${time.toLocaleString()}]`,
        getMessageColor(level),
        `${severity}:`,
        getFgColor('reset'),
        util.format("%s", `${name}`),
        getMessageColor(level),
        messageFormat,
        getFgColor('reset'),
        data,
      ];

      if (level === 30) {
        console.info(...args, );
      } else if (level === 40) {
        console.warn(...args);
      } else {
        console.error(...args);
      }
    } catch (e) {
      console.error(e);
    }

    done();
  }
}

export default ConsoleStream;
