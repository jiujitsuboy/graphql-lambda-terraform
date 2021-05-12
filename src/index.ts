import { GraphQLServerLambda } from 'graphql-yoga'
import typeDefs from './schema/typeDefs'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'


const graphQLServerLambda: GraphQLServerLambda = new GraphQLServerLambda({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: request => ({ ...request })
})

const server = graphQLServerLambda.graphqlHandler

export { server as handler }

