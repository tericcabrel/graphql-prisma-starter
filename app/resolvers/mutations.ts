import bcrypt from 'bcryptjs';

import { hashPassword } from '../utils/helpers';
import { generateToken, getUserId } from '../utils/jwt';
import { GraphContext, LoginResult } from '../types/common';
import { GraphQLResolveInfo } from 'graphql';

const mutations = {
  async createUser(
    parent: any,
    args: { [key: string]: any; },
    { prisma }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<LoginResult> {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async login(
    parent: any,
    args: { [key: string]: any; },
    { prisma }: GraphContext,
    info: GraphQLResolveInfo,
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
    parent: any,
    args: { [key: string]: any; },
    { prisma, request }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({
      where: {
        id: userId,
      },
    },                                info);
  },
  async updateUser(
    parent: any,
    args: { [key: string]: any; },
    { prisma, request }: GraphContext,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId,
      },
      data: args.data,
    },                                info);
  },
};

export { mutations as default };
