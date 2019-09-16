import { getUserId } from '../utils/jwt';
import { GraphContext } from '../types/common';
import { GraphQLResolveInfo } from 'graphql';

const queries = {
  getUsers(
    parent: any, args: { [key: string]: any; }, { prisma, request }: GraphContext, info: GraphQLResolveInfo,
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
    parent: any, args: any, { prisma, request }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    const query = {
      where: {
        id: userId,
      },
    };

    return prisma.query.user(query);
  },
  getUser(
    parent: any, args: any, { prisma, request }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    const query = {
      where: {
        id: args.id,
      },
    };

    return prisma.query.user(query);
  },
};

export { queries as default };
