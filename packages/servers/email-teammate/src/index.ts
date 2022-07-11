import 'reflect-metadata';
import process from 'process';
import express, { Express, Router } from 'express';
import { logger } from '@harmonie/server-shared';
import appConfig from './config'; // must be at the most top level
import { createApolloServer } from './apollo';
import { configureApp, configureRoutes } from './app';
import { initBlobStorage, initKeyVault, initMongodb } from './clients';

const app = express();
const router = Router();
const log = logger.createLogger();

const start = async (app: Express) => {
  configureApp(app, router, appConfig);
  await createApolloServer(app);
  configureRoutes(app, router);
  initBlobStorage(appConfig.blobConnectionString);
  initKeyVault(appConfig.vaultConnectionString);
  await initMongodb(appConfig.dbConnectionString);
};

const listen = async () => {
  const server = app
    .listen(+appConfig.port, '0.0.0.0', async () => {
      try {
        log.info({ port: appConfig.port, address: server.address() }, `Server is running`);
        await start(app);
      } catch (error: any) {
        log.error(error, `error starting server: ${error.message}`);
        server.close();
        process.exit(1);
      }
    })
    .setTimeout(600000);
};

listen();
