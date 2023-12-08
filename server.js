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

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray
})

const app = express();

//Yoga
const yoga = createYoga({
  schema: schema,
  context: (req) => ({ // Context factory gets called for every request
      //myToken: req.headers.get('authorization') // I've commented this line because it was causing problems and it seems to work :)
  }),
  graphiql: true,
})

//MiddleWare
app.use('/graphql', yoga)


app.listen(3000, () => {
    console.log('Running GraphQL server...')
});