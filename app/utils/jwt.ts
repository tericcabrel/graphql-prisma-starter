import jwt from 'jsonwebtoken';
import * as config from '../core/config';
import { ITokenProps } from '../types/common';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '7 days' });
};

export const getUserId = (request: any, requireAuth = true): string|null => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    const token: string = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.JWT_SECRET) as ITokenProps;
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};
