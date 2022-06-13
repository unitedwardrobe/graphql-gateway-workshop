/* istanbul ignore file */
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express, { json } from "express";
import path from "path";
import { getDataloaders } from "./dataloaders";
import { environment } from "./lib/environment";
import resolvers from "./resolvers";
import { getServices } from "./services";
import { AppContext } from "./types";

const app = express();

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(
    loadFilesSync([path.join(__dirname, "./**/*.graphql")])
  ),
  resolvers,
});

export const server = new ApolloServer({
  schema,
  context: (): AppContext => {
    const services = getServices();
    const dataloaders = getDataloaders(services);

    return {
      services,
      dataloaders,
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

app.use(json());
app.get("/health_check", (_, res) => {
  res.status(200).contentType("text/plain").send("GraphQL Server is up");
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({
    app,
  });

  app.listen(environment.port, () => {
    // eslint-disable-next-line no-console
    console.log(`GraphQL server is running on port ${environment.port}`);
  });
};

startServer();
