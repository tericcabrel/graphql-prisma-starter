// import '@babel/polyfill/noConflict'
import server from './bootstrap/server';

const port = parseInt(process.env.PORT || '4000', 10);

server.start({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
