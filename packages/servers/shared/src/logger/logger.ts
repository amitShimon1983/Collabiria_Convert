import bunyan from 'bunyan';
import { ConsoleStream, AzureStream } from './streams';
import serializers from './serializers';

const { LOGS_STREAMS, APP_INSIGHTS_CONNECTION_STRING } = process.env;

const getStreams = (applicationInsightsConnectionString?: string) => {
  return [
    {
      name: 'azure',
      stream: {
        type: 'raw',
        stream: new AzureStream(applicationInsightsConnectionString),
        reemitErrorEvents: true,
      },
    },
    {
      name: 'stdout',
      stream: {
        type: 'stream',
        stream: process.stdout,
        closeOnExit: false,
      },
    },
    {
      name: 'console',
      stream: {
        type: 'raw',
        stream: new ConsoleStream(),
        closeOnExit: false,
      },
    },
  ];
};

const createLogger = (properties?: { [custom: string]: any }): bunyan => {
  const streamNames = (LOGS_STREAMS || 'console').split(',');
  const applicationInsightsConnectionString = APP_INSIGHTS_CONNECTION_STRING;

  const streams = getStreams(applicationInsightsConnectionString)
    .filter(({ name }: any) => streamNames.includes(name))
    .map(({ stream }: any) => stream);

  return bunyan.createLogger({
    name: properties?.name || 'server',
    ...properties,
    streams,
    serializers,
  });
};

export { bunyan as Logger };

export default createLogger;
