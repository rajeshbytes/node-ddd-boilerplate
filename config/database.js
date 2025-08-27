// config/knex.js
const Knex = require('knex');
const { Model } = require('objection');
require('dotenv').config();

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'my_database',
  }
});

// Bind all Models to this knex instance
Model.knex(knex);

module.exports = knex;
