/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('api_tokens', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
           .references('id').inTable('users')
           .onDelete('CASCADE');
      table.string('token', 255).notNullable();
      table.string('device_info', 255); // optional, e.g., "iPhone 15"
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('expires_at').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('api_tokens');
  };
  