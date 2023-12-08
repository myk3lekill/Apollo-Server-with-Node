const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');


const express = require('express');
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { createYoga } = require('graphql-yoga');

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});
const resolversArray = loadFilesSync('**/*', {
  extensions: ['resolvers.js'],
});

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
  });

  const server = new ApolloServer({
    schema: schema
  });

  await server.start();
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  app.listen(3000, () => {
    console.log('Running GraphQL server...')
  })

}

startApolloServer()




