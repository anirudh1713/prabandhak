import express from 'express';
import http from 'node:http';
import helmet from 'helmet';
import cors from 'cors';
import {startApolloServer} from './apollo.server';
import {config} from './lib/config';

const app = express();

app.use(
  helmet({contentSecurityPolicy: false, crossOriginEmbedderPolicy: false}),
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const httpServer = http.createServer(app);

startApolloServer(app, httpServer).then(() => {
  console.log(`🚀 GraphQL Server ready on port ${config.env.port}`);
});
