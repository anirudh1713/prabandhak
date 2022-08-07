import {Knex} from 'knex';
import {config} from './lib/config';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: config.env.dbConnectionUrl,
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
    loadExtensions: ['.js', '.ts'],
    extension: 'ts',
  },
  seeds: {
    directory: './src/db/seeds',
  },
  debug: false,
};

export default knexConfig;
