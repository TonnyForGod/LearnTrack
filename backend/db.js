const { Pool } = require('pg');
require('dotenv').config();

// Create a single shared pool for the whole app
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;