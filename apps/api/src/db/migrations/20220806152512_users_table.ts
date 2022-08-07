import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (t) {
    t.increments('id');
    t.string('firstName', 255).notNullable();
    t.string('lastName', 255).notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.timestamp('createdAt');
    t.timestamp('updatedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
