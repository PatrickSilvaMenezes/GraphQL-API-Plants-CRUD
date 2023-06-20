import { ApolloServer } from "apollo-server";
import path from "node:path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PlantResolver } from "./resolvers/plant-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PlantResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  })

  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen();
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap()