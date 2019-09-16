import { getUserId } from '../utils/jwt';
import { GraphContext } from '../types/common';
import { GraphQLResolveInfo } from 'graphql';

const queries = {
  users(
    parent: any,
    args: { [key: string]: any; },
    { prisma, request }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

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
    parent: any,
    args: { [key: string]: any; },
    { prisma, request }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
  user(
    parent: any,
    args: any,
    { prisma, request }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: args.id,
      },
    });
  },
};

export { queries as default };
