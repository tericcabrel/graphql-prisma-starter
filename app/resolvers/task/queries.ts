import { GraphQLResolveInfo } from 'graphql';

import { GraphContext } from '../../types/common';
import { Task } from '../../../prisma/generated/prisma-client';

export default {
  getTasks(
    parent: any, args: any, { prisma, request, userId }: GraphContext, info: GraphQLResolveInfo,
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
          title_contains: args.query,
        }],
      };
    }

    return prisma.query.tasks(opArgs, info);
  },
  getTask(
    parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<Task> {
    const query = {
      where: {
        id: args.id,
      },
    };

    return prisma.query.task(query);
  },
};
