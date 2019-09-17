import jwt from 'jsonwebtoken';
import * as config from '../config';
import { ITokenProps } from '../../types/common';
import { GraphQLResolveInfo } from 'graphql';

const pathAlloweds = [
  'createUser',
  'login',
];

export const authorizationMiddleware = async (resolve: any, root: any, args: any, context: any, info: GraphQLResolveInfo) => {
  const { request } = context;
  const { path } = info;

  // At the first check, path.key contains the key of the query
  const requestPath: string = (context.path || path.key) as string;
  if (pathAlloweds.indexOf(requestPath) >= 0) {
    // When the path is allowed without authentication, we inject it in the context to retrieve it later
    context.path = requestPath;
    return  await resolve(root, args, context, info);
  }

  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  // If userId is present in the context, it's mean the user is already authorized so, no need to check the token again
  if (context.userId) {
    return  await resolve(root, args, context, info);
  }

  try {
    if (header) {
      const token: string = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, config.JWT_SECRET) as ITokenProps;

      context.userId = decoded.userId;

      return  await resolve(root, args, context, info);
    }
  } catch (e) {
    throw new Error('Authentication required');
  }

  throw new Error('Authentication required');
};
