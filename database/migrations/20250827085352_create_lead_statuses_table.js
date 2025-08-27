exports.up = function(knex) {
    return knex.schema.createTable('lead_statuses', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('color_code').notNullable();
      table.boolean('status').defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('lead_statuses');
  };
  