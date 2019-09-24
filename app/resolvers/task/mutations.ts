import { GraphQLResolveInfo } from 'graphql';
import { GraphContext } from '../../types/common';
import { createTaskSchema } from '../../validators/task';
import { BatchPayload, Task } from '../../../prisma/generated/prisma-client';

export default {
  createTask: {
    validationSchema: createTaskSchema,
    resolve: async (
      parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo,
    ): Promise<Task> => {
      const query = {
        data: {
          ...args.data,
          creator: {
            connect: {
              id: args.data.user_id,
            },
          },
        },
      };

      return await prisma.mutation.createTask(query);
    },
  },
  async updateTask(
    parent: any, args: any, { prisma, request, userId }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<Task> {
    const query = {
      where: {
        id: userId,
      },
      data: { ...args.data },
    };

    return prisma.mutation.updateTask(query, info);
  },
  async deleteTask(
    parent: any, args: any, { prisma, request }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<BatchPayload> {
    // TODO Check if the user has the right

    const query = {
      where: {
        id_in: args.ids,
      },
    };

    return prisma.mutation.deleteManyTasks(query, info);
  },
};
