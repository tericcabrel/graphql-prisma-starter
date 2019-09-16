// import '@babel/polyfill/noConflict'
import server from './bootstrap/server';
import { Logger } from './utils/logger';

const port = parseInt(process.env.PORT || '4000', 10);

server.start({ port }, () => {
  Logger.info(`🚀 Server ready at http://localhost:${port}/graphql`);
});
