import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from '../resolvers';
import prisma from './prisma';

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
  // fragmentReplacements,
});

export { server as default };
