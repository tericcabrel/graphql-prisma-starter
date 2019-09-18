import { GraphQLServer, PubSub } from 'graphql-yoga';

import { resolvers, fragmentReplacements } from '../resolvers';
import typeDefs from '../schemas';

import prisma from './prisma';

import { authorizationMiddleware } from '../core/middleware/authorization';
import { dataValidationMiddleware } from '../core/middleware/data-validation';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  middlewares: [
    authorizationMiddleware,
    dataValidationMiddleware,
  ],
  // fragmentReplacements,
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED => ', err);
  // process.exit(1);
});

export { server as default };
