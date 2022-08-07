import {knex} from 'knex';
import knexConfig from '../knexfile';

// TODO - differentiate dev, prod and test configs.
const knexInstance = knex(knexConfig);

export default knexInstance;
