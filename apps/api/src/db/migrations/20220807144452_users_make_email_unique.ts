import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.unique(['email']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.dropUnique(['email']);
  });
}
