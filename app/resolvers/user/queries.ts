import { GraphQLResolveInfo } from 'graphql';

import { GraphContext } from '../../types/common';

export default {
  getUsers(
    parent: any, args: { [key: string]: any; }, { prisma, request, userId }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const opArgs: any = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query,
        }],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(
    parent: any, args: any, { prisma, userId }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const query = {
      where: {
        id: userId,
      },
    };

    return prisma.query.user(query);
  },
  getUser(
    parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const query = {
      where: {
        id: args.id,
      },
    };

    return prisma.query.user(query);
  },
};
