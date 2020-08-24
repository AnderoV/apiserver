const { Pool } = require('pg');

const dbClient = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000
});

module.exports = dbClient;