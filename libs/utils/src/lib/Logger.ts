import { Request } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { DateTime } from 'luxon';
import { TokenIndexer } from 'morgan';
import pino from 'pino';
import morgan = require('morgan');

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    prettyPrint: {
      colorize: true,
      levelFist: true,
      translateTime: 'UTC:yyyy-mm-dd HH:MM:ss',
    },
  },
});

const requestLogFormatter = (
  tokens: TokenIndexer,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
): string => {
  let color = 0;
  if (res.statusCode >= 100 && res.statusCode < 200) {
    color = 94;
  } else if (res.statusCode >= 200 && res.statusCode < 300) {
    color = 32;
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    color = 34;
  } else if (res.statusCode >= 400 && res.statusCode < 500) {
    color = 33;
  } else if (res.statusCode >= 500) {
    color = 31;
  }

  return [
    `[${DateTime.fromISO(tokens['date'](req, res, 'iso') as string).toFormat('HH:mm:ss.SSS')}]`,
    `\x1b[${color}m` + `${tokens['method'](req, res)}`.padStart(7, ' ') + '\x1b[0m',
    `(\x1b[${color}mHTTP ${tokens['status'](req, res)}\x1b[0m):`,
    '\x1b[36m' + tokens['url'](req, res),
    `- ${tokens['response-time'](req, res, 0)}ms\x1b[0m`,
  ].join(' ');
};

const requestLogSkipper = (req: Request): boolean => {
  const loggableMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  return !loggableMethods.includes(req.method);
};

export const requestLogger = morgan(requestLogFormatter, {
  skip: requestLogSkipper,
});
