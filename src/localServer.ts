import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './schema/typeDefs'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'

const graphQLServer: GraphQLServer = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: (request) => ({ ...request }),
})

graphQLServer.start(() => {
  console.log('graphql server is up!')
})
