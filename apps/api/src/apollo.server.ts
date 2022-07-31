import {Express} from 'express';
import {Server} from 'node:http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import {ApolloServer} from 'apollo-server-express';
import {config} from './lib/config';
import {initializeSchema} from './graphql/schema';

export async function startApolloServer(app: Express, httpServer: Server) {
  const schema = await initializeSchema();

  const server = new ApolloServer({
    schema,
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
