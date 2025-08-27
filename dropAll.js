const knex = require('knex')(require('./knexfile').development);

async function dropAllTables() {
  const tables = await knex.raw(`SHOW TABLES`);
  const tableNames = tables[0].map(row => Object.values(row)[0]);

  for (const name of tableNames) {
    await knex.schema.dropTableIfExists(name);
    console.log(`Dropped table: ${name}`);
  }

  process.exit(0);
}

dropAllTables().catch(err => {
  console.error(err);
  process.exit(1);
});
