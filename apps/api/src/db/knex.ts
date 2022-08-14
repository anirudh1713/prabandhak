import {knexSnakeCaseMappers} from 'objection';
import {knex} from 'knex';
import knexConfig from '../knexfile';

// TODO - differentiate dev, prod and test configs.
const knexInstance = knex({
  ...knexConfig,
  ...knexSnakeCaseMappers(),
});

export default knexInstance;
