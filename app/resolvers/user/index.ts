import mutations from './mutations';
import queries from './queries';
import subscriptions from './subscriptions';

import { GraphContext } from '../../types/common';

export default {
  Mutation: mutations,
  Query: queries,
  // Subscription: subscriptions,
  User: {
    email: {
      fragment: 'fragment userId on User { id }',
      resolve(parent: any, args: any, { request, userId }: GraphContext, info: any) {
        if (userId && userId === parent.id) {
          return parent.email;
        }
        return null;
      },
    },
    password: {
      resolve(parent: any, args: any, context: GraphContext, info: any) {
        return null;
      },
    },
  },
};
