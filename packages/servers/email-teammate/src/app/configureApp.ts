import express, { Express, Router } from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware, loggingMiddleware } from './middleware';
import { Configuration } from '../config';

export const configureApp = async (app: Express, router: Router, appConfig: Configuration) => {
  app.use(cookieParser());
  app.use(express.json({ limit: '50mb' }) as any);
  app.use(corsMiddleware(app, { allowedOrigins: appConfig.allowedOrigins, xFrameOption: appConfig.xFrameOption }));
  app.enable('trust proxy');
  app.use(loggingMiddleware);
};
