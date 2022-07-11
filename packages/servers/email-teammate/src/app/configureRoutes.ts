import { Application, Router } from 'express';
import { healthCheck, authentication } from '../api';
import { staticMiddleware } from './middleware';
import appConfig from '../config';

export const configureRoutes = (app: Application, router: Router) => {
  healthCheck(router);
  authentication(router);
  app.use('/', router);
  staticMiddleware(app, appConfig);
};
