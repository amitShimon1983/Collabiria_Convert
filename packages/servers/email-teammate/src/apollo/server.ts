import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { logger } from '@harmonie/server-shared';
import {
  MessageResolver,
  AttachmentResolver,
  PeopleResolver,
  OrganizationResolver,
  OrganizationMemberResolver,
  TeamResolver,
  TeamMemberResolver,
} from './resolvers';
import { initContext } from './initContext';

const log = logger.createLogger();

export default async (app: Express): Promise<ApolloServer> => {
  const server = new ApolloServer({
    context: await initContext(),
    schema: await buildSchema({
      resolvers: [
        MessageResolver,
        AttachmentResolver,
        PeopleResolver,
        OrganizationResolver,
        OrganizationMemberResolver,
        TeamResolver,
        TeamMemberResolver,
      ],
      validate: false,
      emitSchemaFile: true,
      nullableByDefault: true,
    }),
  });
  server.applyMiddleware({ app, path: '/api/graphql', cors: false });
  log.info({ path: '/api/graphql' }, 'Apollo is running');

  return server;
};
