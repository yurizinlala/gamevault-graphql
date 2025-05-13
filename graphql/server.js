const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: ({ req }) => ({
    headers: req.headers
  }),
  formatError: (error) => ({
    message: error.message,
    code: error.extensions?.code || 'INTERNAL_ERROR'
  })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Servidor GraphQL pronto em ${url}`);
});