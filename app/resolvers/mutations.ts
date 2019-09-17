import bcrypt from 'bcryptjs';

import { hashPassword, isValidPassword, timestamp } from '../utils/helpers';
import { generateToken } from '../utils/jwt';
import { GraphContext, LoginResult, Timestamp } from '../types/common';
import { GraphQLResolveInfo } from 'graphql';

const mutations = {
  async createUser(
    parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<LoginResult> {
    if (!isValidPassword(args.data.password)) {
      throw new Error('The password is not valid!');
    }

    const password = await hashPassword(args.data.password);
    const date: Timestamp = timestamp();
    const query = {
      data: {
        ...args.data,
        password,
        ...date,
      },
    };

    return  await prisma.mutation.createUser(query);
  },
  async login(
    parent: any, args: any, { prisma }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<LoginResult> {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(
    parent: any, args: any, { prisma, request, userId }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    const query = {
      where: {
        id: userId,
      },
    };

    return prisma.mutation.deleteUser(query, info);
  },
  async updateUser(
    parent: any, args: any, { prisma, request, userId }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    const date: Timestamp = timestamp();
    const query = {
      where: {
        id: userId,
      },
      data: { ...args.data, updated_at: date.updated_at },
    };

    return prisma.mutation.updateUser(query, info);
  },
  async deleteOneUser(
    parent: any, args: any, { prisma, request }: GraphContext, info: GraphQLResolveInfo,
  ): Promise<any> {
    // TODO Check if the user has the right

    const query = {
      where: {
        id: args.id,
      },
    };

    return prisma.mutation.deleteUser(query, info);
  },
};

export { mutations as default };
