import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from '../resolvers';
import prisma from './prisma';
import { authorizationMiddleware } from '../core/middleware/authorization';
import { dataValidationMiddleware } from '../core/middleware/data-validation';

const pubsub = new PubSub();

const server = new GraphQLServer({
  resolvers,
  typeDefs: 'app/schemas/schema.graphql',
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  middlewares: [authorizationMiddleware, dataValidationMiddleware],
  // fragmentReplacements,
});

export { server as default };
