import { extractFragmentReplacements } from 'prisma-binding';
import Query from './queries';
import Mutation from './mutations';
import Subscription from './subscriptions';
import User from './user';

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
