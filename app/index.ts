// import '@babel/polyfill/noConflict'
import server from './bootstrap/server';
import { logger } from './core/logger/logger';
import { formatError } from './core/logger/error-handler';

const port = parseInt(process.env.PORT || '4000', 10);

const options = {
  port,
  formatError,
  endpoint: '/graphql',
  debug: false,
};

server.start(options , () => {
  logger.info(`🚀 Server ready at http://localhost:${port}/graphql`);
});
