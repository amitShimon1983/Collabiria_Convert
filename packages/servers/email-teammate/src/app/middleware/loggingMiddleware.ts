import { NextFunction, Request, Response } from 'express';
import { logger } from '@harmonie/server-shared';

const log = logger.createLogger();

export default (req: Request, res: Response, next: NextFunction) => {
  log.info({ req }, 'Request');
  next();
};
