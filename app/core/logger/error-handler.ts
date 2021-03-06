import {
  isInstance as isApolloErrorInstance,
  formatError as formatApolloError,
} from 'apollo-errors';
import { logger } from './logger';

export const formatError =  (error: any) => {
  const { originalError } = error;

  // Skip logging Apollo controlled errors
  if (isApolloErrorInstance(originalError)) {

    // Maybe do stuff with apollo error

    return formatApolloError(error);
  }

  logger.error({
    message: `[${ error.path ? error.path.join(' - ') : 'Prisma' }] => ${error.stack ? error.stack.toString() : error.message }`,
  });
  return error;
};
