import mutations from './mutations';
import queries from './queries';
import subscriptions from './subscriptions';

import { GraphContext } from '../../types/common';
import {GraphQLResolveInfo} from 'graphql';

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
        return 'hidden';
      },
    },
    password: {
      resolve(parent: any, args: any, context: GraphContext, info: any) {
        return 'hidden';
      },
    },
    tasks: {
      fragment: 'fragment UserId on User { id }',
      resolve(parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo) {
        return prisma.query.tasks({
          where: {
            creator: {
              id: parent.id,
            },
          },
        });
      },
    },
  },
};
