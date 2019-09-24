import mutations from './mutations';
import queries from './queries';
import subscriptions from './subscriptions';

import { GraphContext } from '../../types/common';
import { GraphQLResolveInfo } from 'graphql';

export default {
  Mutation: mutations,
  Query: queries,
  // Subscription: subscriptions,
  Task: {

  },
};
