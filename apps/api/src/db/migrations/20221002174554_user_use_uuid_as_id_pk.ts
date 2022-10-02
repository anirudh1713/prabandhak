import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.dropPrimary();
    t.uuid('_id').primary();
    t.dropColumn('id');
    t.renameColumn('_id', 'id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.dropPrimary('id');
    t.increments('_id').primary();
    t.dropColumn('id');
    t.renameColumn('_id', 'id');
  });
}
