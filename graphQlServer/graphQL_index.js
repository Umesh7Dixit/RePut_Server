import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

import MergedResolvers from "./resolvers/index.js";
import MergedTypeDefs from "./typeDefs/index.js";


const server = new ApolloServer({
  typeDefs : MergedTypeDefs,
  resolvers : MergedResolvers,
})

const {url} = await startStandaloneServer(server);

console.log(`Server started at ${url}`);