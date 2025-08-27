// database/migrations/20250827_drop_all_tables.js
exports.up = async function(knex) {
    // List all tables you want to drop
    // await knex.schema.dropTableIfExists('users');
    // await knex.schema.dropTableIfExists('roles');
    // await knex.schema.dropTableIfExists('lead_statuses');
    // Add other tables here
  };
  
  exports.down = function(knex) {
    // Optionally recreate tables if needed
  };
  