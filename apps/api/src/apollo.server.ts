import {Express} from 'express';
import {Server} from 'node:http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import {ApolloServer} from 'apollo-server-express';
import {createApplication} from 'graphql-modules';
import {config} from './lib/config';
import {gqlModules} from './modules';

const application = createApplication({
  modules: [...gqlModules],
});

export async function startApolloServer(app: Express, httpServer: Server) {
  const executor = application.createApolloExecutor();
  const schema = application.schema;

  const server = new ApolloServer({
    schema,
    executor,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      config.env.isProduction
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({embed: true}),
    ],
  });
  await server.start();
  server.applyMiddleware({app, cors: false});
  await new Promise<void>(resolve =>
    httpServer.listen({port: config.env.port}, resolve),
  );
}
