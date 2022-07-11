import path from 'path';
import express, { Application, NextFunction, Request, Response } from 'express';
import ejs from 'ejs';
import compression from 'compression';
import { Configuration } from '../../config';

export default (app: Application, appConfig: Configuration) => {
  app.engine('html', ejs.renderFile);
  app.set('view cache', false);
  app.set('etag', false);
  const shouldCompress = (req: Request, res: Response) => {
    if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
      return compression.filter(req, res);
    }
    return false;
  };

  app.use(compression({ filter: shouldCompress }));

  const renderIndex = (req: Request, res: Response, next: NextFunction) => {
    if (req.url.includes('.')) {
      return next();
    }
    app.set('views', path.join(__dirname, '../../../', 'collabria'));
    console.log('renderIndex PATH', path.join(__dirname, '../../../', 'collabria'));
    console.log('renderIndex URL', req.url);

    res.render('index.html', {
      REACT_APP_AZURE_CLIENT_ID: appConfig.azureClientId,
      REACT_APP_AZURE_CLIENT_SCOPE: appConfig.azureClientScope,
      REACT_APP_SERVER_BASE_URL: appConfig.serverBaseUrl,
      REACT_APP_EXTERNAL_SITE_END_POINT: appConfig.externalSiteUrl,
    });
  };

  const renderEmailTeammate = (req: Request, res: Response, next: NextFunction) => {
    if (req.url.includes('.')) {
      return next();
    }
    app.set('views', path.join(__dirname, '../../../', 'email-teammate'));

    console.log('renderEmailTeammate PATH', path.join(__dirname, '../../../', 'email-teammate'));
    console.log('renderEmailTeammate URL', req.url);
    res.render('index.html', {
      REACT_APP_AZURE_CLIENT_ID: appConfig.azureClientId,
      REACT_APP_AZURE_CLIENT_SCOPE: appConfig.azureClientScope,
      REACT_APP_SERVER_BASE_URL: appConfig.serverBaseUrl,
    });
  };

  const isTabRequest = (req: Request) =>
    path.join(__dirname, '../../../', req.path.includes('email-teammate') ? '' : 'collabria');

  const viewPathMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const buildPath = isTabRequest(req);
    console.log('viewPathMiddleware PATH', req.url);
    console.log('viewPathMiddleware URL', buildPath);
    app.set('views', buildPath);
    app.use(express.static(buildPath));

    next();
  };

  app.use(viewPathMiddleware);
  app.get('/email-teammate', renderEmailTeammate);
  app.get('/email-teammate/*', renderEmailTeammate);
  app.get('/', renderIndex);
  app.get('/*', renderIndex);
};
