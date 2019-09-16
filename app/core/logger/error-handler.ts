import {
  isInstance as isApolloErrorInstance,
  formatError as formatApolloError,
} from 'apollo-errors';
import { Logger } from './logger';

export const formatError =  (error: any) => {
  const { originalError } = error;

  // Skip logging Apollo controlled errors
  if (isApolloErrorInstance(originalError)) {

    // Maybe do stuff with apollo error

    return formatApolloError(error);
  }

  Logger.error({ message: `[${error.path.join(' - ')}] => ${error.message}` });
  return error;
};
