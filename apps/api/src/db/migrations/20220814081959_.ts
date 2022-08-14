import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.renameColumn('firstName', 'first_name');
    t.renameColumn('lastName', 'last_name');
    t.renameColumn('createdAt', 'created_at');
    t.renameColumn('updatedAt', 'updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', t => {
    t.renameColumn('first_name', 'firstName');
    t.renameColumn('last_name', 'lastName');
    t.renameColumn('created_at', 'createdAt');
    t.renameColumn('updated_at', 'updatedAt');
  });
}
